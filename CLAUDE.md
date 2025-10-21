# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Reference: Common Commands

### Development
- **Build**: `npx quartz build` (generate static site in `public/`)
- **Serve locally**: `npx quartz build --serve` (runs on port 8080 with hot reload)
- **Watch mode**: `npx quartz watch` (rebuilds on file changes)
- **Check types**: `npm run check` (TypeScript verification + formatting check)
- **Format**: `npm run format` (applies Prettier)
- **Run tests**: `npm run test` (runs tsx test files)
- **Profile build**: `npm run profile` (measure build performance with 0x)

### Docs
- **Build docs site**: `npm run docs` (builds quartz.jzhao.xyz documentation locally)

## Project Overview

**Quartz v4** is a plugin-based static site generator (SSG) built with TypeScript/JavaScript that transforms Markdown notes into fully-featured digital garden websites.

- **Entry point**: `quartz/bootstrap-cli.mjs` (CLI dispatcher)
- **Main build logic**: `quartz/build.ts`
- **Configuration**: `quartz.config.ts` (user site config) and `quartz/cfg.ts` (types)
- **Content source**: `content/` (user markdown files)
- **Build output**: `public/` (static HTML)
- **Node requirements**: >= v22, npm >= 10.9.2

## High-Level Architecture

### Core Concepts

Quartz uses a **three-stage plugin pipeline** that processes content:

```
Files (*.md) → Parse (transform with plugins) → Filter (select content) → Emit (generate outputs)
```

**Plugin Types:**
1. **Transformers** (14 plugins): Modify markdown/HTML AST during parsing
   - Examples: `FrontMatter`, `SyntaxHighlighting`, `ObsidianFlavoredMarkdown`, `TableOfContents`
   - Provide text transforms, markdown plugins (remark), and HTML plugins (rehype)

2. **Filters** (3 plugins): Decide which content to publish
   - Examples: `RemoveDrafts`, `ExplicitFilter`
   - Return `shouldPublish()` boolean

3. **Emitters** (14 plugins): Generate output files
   - Examples: `ContentPage` (HTML pages), `TagPage`, `ContentIndex` (RSS, sitemaps)
   - Support incremental builds via `partialEmit()`

### Data Processing Pipeline

**File Flow:**
1. Glob files from `content/` (respecting `.gitignore`)
2. **Parse Stage**: Parse each markdown file through unified processor
   - Text transforms → Markdown parsing (remark) → Markdown plugins → HTML conversion (rehype) → HTML plugins
   - Multi-threaded via workerpool for >128 files
   - Output: `ProcessedContent = [HtmlRoot, VFile]` (HTML AST + metadata)
3. **Filter Stage**: Run filter plugins, exclude matching files
4. **Emit Stage**: Parallel emitters generate output files
   - Collect all static resources (CSS, JS)
   - Transform HTML AST → JSX → HTML strings
   - Write to `public/`

**Build Context** (`BuildCtx`) provides plugins access to:
- `cfg`: Configuration
- `allSlugs`: All parsed page slugs (for linking)
- `allFiles`: All source files
- `trie`: File tree for searching
- `incremental`: Watch mode flag

### URL/Path System (Important!)

Quartz uses **nominal typing** to prevent URL collision bugs:
- `FilePath`: Absolute paths with extension (e.g., `"folder/note.md"`)
- `FullSlug`: Canonical slug without extension (e.g., `"folder/note"`)
- `SimpleSlug`: Folder path (e.g., `"folder/"`)
- `RelativeURL`: For linking (e.g., `"../other"`)

**Link Resolution**: Shortest-path matching for internal links (e.g., `[[note]]` resolves to nearest file)

### Component System

**Components** are Preact components with optional attached CSS/JS:

```typescript
type QuartzComponent = ComponentType<QuartzComponentProps> & {
  css?: StringResource
  beforeDOMLoaded?: StringResource  // <head> script
  afterDOMLoaded?: StringResource   // <body> script
}
```

**Layout** (`quartz.layout.ts`): Pages composed from components:
- `head`, `header`, `beforeBody`, `pageBody`, `afterBody`, `footer`
- `left`/`right`: Sidebars
- Each component contributes CSS/JS resources

**Key Components**: `Explorer` (file tree), `Search`, `TableOfContents`, `Graph`, `Backlinks`, `Darkmode`, etc.

### Performance Features

1. **Multi-threading**: Workerpool spawns workers for parsing (smart heuristics: 1-4 threads)
2. **Incremental builds**: Watch mode tracks changes, runs `partialEmit()`
3. **Lazy resources**: Client scripts split into pre/post-DOM-ready
4. **Hot reload**: WebSocket notifies browser of rebuilds
5. **Asset optimization**: CSS minified with Lightning CSS, JS bundled with esbuild

## Key Source Directories

```
quartz/
├── bootstrap-cli.mjs          # CLI entry (yargs dispatcher)
├── build.ts                   # Main build orchestration
├── cfg.ts                     # Configuration type definitions
├── worker.ts                  # Worker thread setup
├── cli/                       # CLI command handlers
├── plugins/
│   ├── types.ts              # Plugin interface definitions
│   ├── transformers/         # 14 content transformation plugins
│   ├── filters/              # 3 filtering plugins
│   ├── emitters/             # 14 output generation plugins
│   └── vfile.ts              # VFile (virtual file) extensions
├── processors/
│   ├── parse.ts              # Markdown parsing orchestration
│   ├── filter.ts             # Filter pipeline
│   └── emit.ts               # Output emission
├── components/               # 31 UI components
│   ├── renderPage.tsx        # Page rendering engine
│   ├── pages/                # Layout component types
│   ├── scripts/              # Client-side logic
│   ├── styles/               # Component SCSS
│   └── types.ts              # Component interfaces
├── util/
│   ├── path.ts               # URL/slug helpers
│   ├── ctx.ts                # Build context
│   ├── resources.tsx         # Resource (CSS/JS) management
│   ├── fileTrie.ts           # File tree data structure
│   ├── i18n.ts               # Internationalization
│   ├── index.ts              # File indexing
│   └── ... (logging, theming, emoji, etc.)
├── i18n/                     # Locale strings
├── styles/                   # Global SCSS
└── static/                   # Static assets
```

## Plugin Development Guide

### Creating a Transformer Plugin

Transformers modify content during parsing. Structure:

```typescript
export const MyTransformer = (options?: Options): QuartzTransformerPlugin => ({
  name: "MyTransformer",
  markdownPlugins() { return [remarkPlugin] },      // Modify markdown AST
  htmlPlugins() { return [rehypePlugin] },          // Modify HTML AST
  textTransform?(text) { return text }              // Pre-parse text modification
})
```

**Access plugin data**: Via `VFile.data.frontmatter`, `VFile.data.slug`, etc.

### Creating a Filter Plugin

```typescript
export const MyFilter = (): QuartzFilterPlugin => ({
  name: "MyFilter",
  shouldPublish(ctx, content) {
    return !content.data.frontmatter?.draft
  }
})
```

### Creating an Emitter Plugin

Emitters generate files. Support both sync/async and arrays/generators:

```typescript
export const MyEmitter = (): QuartzEmitterPlugin => ({
  name: "MyEmitter",
  async *emit(ctx) {
    for (const slug of ctx.allSlugs) {
      yield {
        slug,
        ext: ".html",
        content: renderToString(jsx)
      }
    }
  },
  // For watch mode, only reprocess changed files:
  async *partialEmit(ctx, changed) {
    for (const slug of changed) {
      yield { slug, ext: ".html", content: ... }
    }
  }
})
```

**Static Resources** from plugins are auto-collected:

```typescript
// In plugin definition:
resources: {
  css: ["path/to/plugin.css"],
  js: [{ src: "path/to/plugin.js", loadTime: "beforeDOMLoaded" }]
}
```

## Configuration Notes

**Config Location**: `quartz.config.ts`

**Common Customizations**:
- **Page title**: `configuration.pageTitle`
- **Theme**: `configuration.theme` (light/dark colors, fonts)
- **Plugins**: `plugins.transformers`, `plugins.filters`, `plugins.emitters`
- **Analytics**: `configuration.analytics` (supports Plausible, Google, Umami, etc.)
- **Locale**: `configuration.locale` (BCP 47 language tags)
- **Base URL**: `configuration.baseUrl` (for RSS, sitemaps)

**Layout Configuration**: `quartz.layout.ts`
- Define which components appear on pages
- Separate `ContentPageLayout` and `ListPageLayout`

## Important Implementation Patterns

### 1. Using VFile Data
Files maintain metadata throughout pipeline:
```typescript
vfile.data.frontmatter     // Parsed YAML frontmatter
vfile.data.slug            // Canonical FullSlug
vfile.data.filePath        // Original FilePath
vfile.data.relativePath    // Relative path
vfile.data.description     // Auto-generated if missing
```

### 2. Working with Slugs
Always use correct slug type for type safety:
```typescript
const slug: FullSlug = simplifySlug(filePath)  // FilePath → FullSlug
const rel: RelativeURL = fromNow(ctx, slug)    // FullSlug → RelativeURL for linking
```

### 3. Modifying AST
Use unist visitor utilities:
```typescript
import { visit } from "unist-util-visit"
export function myPlugin() {
  return (tree) => {
    visit(tree, "heading", (node) => {
      // Modify node
    })
  }
}
```

### 4. Component Resource Declaration
Components add CSS/JS like:
```typescript
MyComponent.css = `/* component styles */`
MyComponent.beforeDOMLoaded = `// runs before page content loads`
MyComponent.afterDOMLoaded = `// runs after page content loads`
```

## Custom Slug Plugin

**Location**: `quartz/plugins/transformers/customSlug.ts`

**Purpose**: Override the auto-generated canonical slug from the filename using a frontmatter `slug:` field.

**Why use it**: Quartz generates slugs from filenames, which creates ugly URLs with spaces-to-dashes conversion and URL-encoded special characters (e.g., accented letters). The CustomSlug plugin lets you specify clean, readable slugs manually.

**Usage in frontmatter**:
```yaml
---
title: La Alucinación es el Feature Fundamental de los LLMs
slug: 2025-10/2025-10-20-la-alucinacion-llms
---
```

**Result**:
- Canonical URL: `https://your-site.com/2025-10/2025-10-20-la-alucinacion-llms`
- No redirect needed
- Clean, readable URL

**Implementation notes**:
- Plugin is registered in `quartz.config.ts` **after** `FrontMatter()` (must run after frontmatter parsing)
- Only overrides slug if `slug:` field exists; otherwise uses default behavior
- Converts provided slug to `FullSlug` type for type safety
- Compatible with `permalink:` field (each serves different purposes)

## Watch Mode & Development

When running `npx quartz build --serve`:
- HTTP server on port 8080 serves build output
- WebSocket on port 3001 sends rebuild signals
- Chokidar watches `.ts`, `.tsx`, `.scss`, config files
- File changes trigger:
  - TypeScript recompilation via esbuild
  - Markdown reparsing (only changed files in incremental mode)
  - Emitter regeneration via `partialEmit()`
  - Browser page refresh via WebSocket

## Testing Considerations

- Test files: `*.test.ts` or `*.test.tsx`
- Run with: `npm run test` (uses tsx test runner)
- No official test suite in main codebase, but plugins can include tests

## Debugging Tips

1. **Verbose logging**: Check build output for plugin logging
2. **Type errors**: `npm run check` for TypeScript issues
3. **Performance**: `npm run profile` (requires 0x installed)
4. **Single file test**: `npx quartz build --directory /path/to/test/content`
5. **Plugin data**: Use `console.log()` in plugin code (visible in build output)

## Common Gotchas

1. **Slug types**: Use the correct slug type (`FilePath` vs `FullSlug`) - types will prevent mistakes
2. **Plugin order**: Transformers run in order; later ones see results of earlier ones
3. **Filter vs Transform**: Use Filter plugins to exclude content, Transformers to modify it
4. **Relative paths**: Link resolution uses `RelativeURL`; don't mix with other path types
5. **Incremental builds**: Emitters must implement `partialEmit()` to work efficiently in watch mode
6. **Resource conflicts**: Ensure CSS/JS resource names don't conflict across plugins

## File Trie & Searching

`FileTrie` data structure enables efficient file searching:
- Built during parsing in `parse.ts`
- Used by link resolution and search plugins
- Supports prefix matching (e.g., `[[note]]` finds `notes/note.md`)

## Versioning & Dependencies

- Node: >= v22
- npm: >= 10.9.2
- Current version: 4.5.2
- Key deps: unified, remark, rehype, preact, esbuild, sharp, workerpool

## Resources

- **Official docs**: https://quartz.jzhao.xyz/
- **GitHub**: https://github.com/jackyzha0/quartz
- **Discord**: https://discord.gg/cRFFHYye7t
