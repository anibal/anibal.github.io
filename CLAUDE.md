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
1. **Transformers** (14 plugins*): Modify markdown/HTML AST during parsing
   - Examples: `FrontMatter`, `SyntaxHighlighting`, `ObsidianFlavoredMarkdown`, `TableOfContents`
   - Provide text transforms, markdown plugins (remark), and HTML plugins (rehype)
   - *Includes `CustomSlug` (user-added); standard Quartz has 13 transformers

2. **Filters** (2 plugins): Decide which content to publish
   - Examples: `RemoveDrafts`, `ExplicitPublish`
   - Return `shouldPublish()` boolean

3. **Emitters** (12 plugins): Generate output files
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

**Key Components**: `Explorer` (file tree), `Search`, `TableOfContents`, `Graph`, `Backlinks`, `Darkmode`, `RecentNotes`, etc.

**Component Inline Scripts Pattern**:
Some components attach client-side behavior via separate `.inline.ts` files imported into the component:

```typescript
// In component TSX file:
// @ts-ignore
import script from "./scripts/recentNotes.inline"

// Component exported with script attached:
RecentNotes.afterDOMLoaded = script
```

Examples: `explorer.inline.ts`, `recentNotes.inline.ts`, `graph.inline.ts`, `graph-loader.inline.ts`

This pattern keeps component logic modular and allows for complex client-side interactions like collapsing, DOM manipulation, and event handling.

### Mobile-First Responsive Architecture

Quartz implements sophisticated mobile-first patterns for optimal UX across devices. The mobile breakpoint is **800px** (defined in `quartz/styles/variables.scss`).

#### Unified Mobile Menu Pattern

On mobile (<800px), Explorer, Search, and RecentNotes merge into a **single overlay menu**:

1. **Opening Explorer on Mobile**:
   - Explorer overlay opens with file tree
   - Search component is **dynamically moved** into Explorer overlay (at top)
   - RecentNotes component is **dynamically moved** into Explorer overlay (at bottom)
   - Background scroll locked via `mobile-no-scroll` class on `<html>`

2. **Closing Explorer on Mobile**:
   - All components **restored to original DOM positions**
   - Scroll lock removed
   - RecentNotes collapsed

**Implementation** (see `toggleExplorer()` function in `quartz/components/scripts/explorer.inline.ts`):
- Stores original parent and next sibling references before moving components
- Uses `checkVisibility()` on mobile button to detect viewport size
- `insertBefore()` and `appendChild()` for DOM manipulation
- Components restore to exact original positions on close

#### Desktop Mutual Exclusion

On desktop (≥800px), only **one sidebar can be expanded** at a time:
- Expanding Explorer collapses RecentNotes
- Expanding RecentNotes collapses Explorer
- Prevents overwhelming sidebar content

**Implementation**: See the desktop mutual exclusion logic in `toggleExplorer()` function (`explorer.inline.ts`) and `toggleRecentNotes()` function (`recentNotes.inline.ts`)

#### Viewport Detection Patterns

Two methods used throughout:

1. **`checkVisibility()`** on mobile-only elements:
   ```typescript
   const mobileButton = element.querySelector(".mobile-explorer") as HTMLElement
   const isMobile = mobileButton?.checkVisibility()
   ```

2. **`window.matchMedia()`** for media queries:
   ```typescript
   const isDesktop = window.matchMedia("(min-width: 801px)").matches
   ```

#### Collapsible Components

**RecentNotes** and **Explorer** both support toggle behavior:
- Fold/unfold SVG icon with rotation animation
- `collapsed` CSS class controls visibility
- `aria-expanded` attribute for accessibility
- Separate mobile/desktop toggle buttons

**Component Scripts**:
- `quartz/components/scripts/explorer.inline.ts`
- `quartz/components/scripts/recentNotes.inline.ts`

#### Scroll Management

When mobile menus open:
```typescript
document.documentElement.classList.add("mobile-no-scroll")
```

Prevents background page scrolling while overlay is active. Removed on close.

### Performance Features

1. **Multi-threading**: Workerpool spawns workers for parsing (smart heuristics: 1-4 threads)
2. **Incremental builds**: Watch mode tracks changes, runs `partialEmit()`
3. **Lazy resources**: Client scripts split into pre/post-DOM-ready
4. **Hot reload**: WebSocket notifies browser of rebuilds
5. **Asset optimization**: CSS minified with Lightning CSS, JS bundled with esbuild
6. **Lazy Graph Loading** ⭐: Graph component (D3, Pixi.js, Tween.js) only loads on desktop viewports (>800px), **saving ~1.2MB for mobile users**
   - `graph-loader.inline.ts` checks viewport with `window.matchMedia`
   - Dynamically loads separate `graph.bundle.js` on-demand
   - Queues navigation events while bundle loads
   - See `loadGraphBundle()` function in `quartz/components/scripts/graph-loader.inline.ts` and `buildGraphBundle()` function in `quartz/plugins/emitters/componentResources.ts`
7. **Critical Script Loading Order** ⚠️: SPA router MUST be loaded first via `unshift()` in emitters
   - SPA router defines `window.addCleanup` that other component scripts depend on
   - Without this order, component cleanup breaks during navigation
   - See `addGlobalPageResources()` function in `quartz/plugins/emitters/componentResources.ts`

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
│   ├── filters/              # 2 filtering plugins
│   ├── emitters/             # 12 output generation plugins
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
- **Page title**: `configuration.pageTitle` - Main site title shown in header
- **Page subtitle**: `configuration.pageSubtitle` - Optional subtitle displayed below title (e.g., "by Author Name")
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

### 5. Critical Script Loading Order (⚠️ IMPORTANT)
When adding scripts to `componentResources.afterDOMLoaded` in emitters, use `unshift()` for foundational scripts that other code depends on:

```typescript
// In componentResources.ts:addGlobalPageResources()
if (cfg.enableSPA) {
  // SPA router MUST be first - defines window.addCleanup
  componentResources.afterDOMLoaded.unshift(spaRouterScript)
}
```

**Why this matters**:
- SPA router defines `window.addCleanup()` used by component scripts for cleanup during navigation
- Component inline scripts (explorer, recentNotes, etc.) call `window.addCleanup()` expecting it to exist
- Loading SPA router last causes "window.addCleanup is not a function" errors
- Always use `unshift()` for foundational utilities, `push()` for dependent scripts

See `addGlobalPageResources()` function in `quartz/plugins/emitters/componentResources.ts`

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

## Testing

### Unit Testing
- Test files: `*.test.ts` or `*.test.tsx`
- Run with: `npm run test` (uses tsx test runner)
- No official test suite in main codebase, but plugins can include tests

### Browser Automation Testing (Playwright MCP)

This project uses **Playwright MCP** for visual regression and interaction testing:

- **Test artifacts**: `.playwright-mcp/` directory contains screenshots from test runs
- **Testing focus**: Mobile menu behavior, responsive layouts, dark mode, component interactions
- **Examples of tested scenarios**:
  - Mobile menu open/close states
  - Search modal behavior
  - Explorer/RecentNotes collapsing
  - Footer rendering
  - Dark mode toggle

**Playwright MCP Access**: Available via Claude Code's MCP integration
- Snapshots: `mcp__playwright__browser_snapshot` - Accessibility tree snapshot
- Screenshots: `mcp__playwright__browser_take_screenshot` - Visual captures
- Interactions: `mcp__playwright__browser_click`, `browser_navigate`, etc.

**Testing Pattern**:
1. Navigate to localhost:8080 (requires `npx quartz build --serve` running)
2. Take snapshots/screenshots to verify UI state
3. Interact with elements (click, type, etc.)
4. Verify responsive behavior at different viewport sizes
5. Store artifacts in `.playwright-mcp/` for comparison

See `.playwright-mcp/` directory for example test artifacts.

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
7. **Script loading order** ⚠️: SPA router and foundational utilities must load first via `unshift()`, not `push()`. Component scripts depend on `window.addCleanup()` from SPA router.
8. **GFM Autolink Literal Bug**: Standard `remark-gfm` treats `@2x` in filenames (e.g., `image@2x.png`) as email addresses. Use `remark-gfm-configurable` with `autolinkLiteral: false` to fix. See `quartz/plugins/transformers/gfm.ts`
9. **Mobile viewport detection**: Use `checkVisibility()` on mobile-only elements OR `window.matchMedia()` for viewport checks. Don't rely solely on CSS classes.
10. **DOM manipulation for mobile**: When moving components between parents, ALWAYS store original parent and next sibling references to restore exact positions. See `explorer.inline.ts` for pattern.

## How to Navigate Code References

This documentation references **function names and file paths** rather than line numbers, which change frequently as code evolves. This approach provides stable references that survive refactoring and make the documentation easier to maintain.

**To find a referenced function**:
1. Open the file mentioned (e.g., `quartz/components/scripts/explorer.inline.ts`)
2. Search for the function name (e.g., `toggleExplorer`)
3. In most IDEs:
   - Text search: `Ctrl/Cmd + F` then type function name
   - Symbol search: `Ctrl/Cmd + Shift + O` (VS Code) or `Ctrl/Cmd + O` (JetBrains)
   - Go to definition: `F12` or `Cmd/Ctrl + Click` on function calls

**Why no line numbers?**
- Line numbers become outdated with every code change
- Function names are more stable and self-documenting
- IDE tools work better with names than coordinates
- Reduces documentation maintenance burden

**Example**: Instead of "`componentResources.ts:121-131`", we write "`addGlobalPageResources()` function in `componentResources.ts`"

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
- I usually have a Quartz running in port 8080, you can connect to it and inspect the pages