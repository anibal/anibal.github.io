# Quartz Image Parsing Issue Report

## Issue Title
ObsidianFlavoredMarkdown Plugin Incompatible with GitHubFlavoredMarkdown - Breaks Image Syntax with `@` Characters in Filenames

## Summary
When using both `ObsidianFlavoredMarkdown` and `GitHubFlavoredMarkdown` plugins together (default Quartz configuration), Obsidian image embeds with `@` characters in filenames (e.g., `@2x` for retina images) fail to render. Instead of displaying as `<img>` tags, they render as broken Obsidian aliases with email-like links.

## Environment
- **Quartz Version:** 4.5.2
- **Platform:** macOS (Darwin 24.6.0)
- **Node Version:** 22+ (tested with npm 10+)

## Problem Description

### Root Cause
The `GitHubFlavoredMarkdown` plugin uses `remark-gfm`, which includes autolink literal detection via `micromark-extension-gfm-autolink-literal`. This extension automatically converts email-like patterns (text with `@` symbol) to `mailto:` links.

**Processing Order Issue:**
When both plugins are enabled (in default configuration order):
1. `ObsidianFlavoredMarkdown` attempts to parse `![[CleanShot 2025-10-19 at 17.35.29@2x.png]]`
2. `GitHubFlavoredMarkdown` runs and the autolink literal parser sees `17.35.29@2x` and converts it to `<a href="./mailto:17.35.29@2x...">`
3. This breaks the wikilink before the Obsidian plugin can fully process it
4. Result: `![[CleanShot 2025-10-19 at <a href="./mailto:17.35.29@2x.png">17.35.29@2x.png</a>]]` - broken image reference

### Affected Filenames
Any Obsidian image embed where the filename contains the `@` symbol:
- Screenshots: `Screenshot@2x.png`, `image@3x.png` (Retina/High-DPI images)
- Email-like patterns: `file@v1.0.png`, `photo@archive.png`
- Other uses: `data@timestamp.png`, `backup@2024.png`

### Example
**Markdown Input:**
```markdown
![[CleanShot 2025-10-19 at 17.35.29@2x.png]]
```

**Expected Output:**
```html
<p><img src="./attachments/CleanShot-2025-10-19-at-17.35.29@2x.png" width="auto" height="auto" alt/></p>
```

**Actual Output (with both plugins enabled):**
```html
<p>![[CleanShot 2025-10-19 at <a href="./mailto:17.35.29@2x.png" class="internal alias" data-slug="mailto:17.35.29@2x.png">17.35.29@2x.png</a>]]</p>
```

## Technical Analysis

### Plugin Order Problem
**File:** `quartz/plugins/transformers/ofm.ts` and `quartz/plugins/transformers/gfm.ts`

The wikilink regex in `ObsidianFlavoredMarkdown` correctly matches:
```regex
/!?\[\[([^\[\]\|\#\\]+)?(#+[^\[\]\|\#\\]+)?(\\?\|[^\[\]\#]*)?\]\]/g
```

However, `GitHubFlavoredMarkdown` uses `remark-gfm` which processes the markdown AST and doesn't respect unparsed wikilinks as atomic units. The autolink literal extension processes inline content before wikilinks are fully resolved.

### Remark/Markdown Pipeline
1. Markdown is converted to AST
2. `remark-gfm` processes the AST and converts email-like patterns in text nodes
3. `ObsidianFlavoredMarkdown` processes wikilinks, but the text has already been corrupted

This is a **plugin ordering/interaction issue**, not a regex issue.

### Why Disabling GitHubFlavoredMarkdown Fixes It
When `GitHubFlavoredMarkdown` is disabled:
- The autolink literal parser doesn't run
- `@` symbols in filenames are preserved
- `ObsidianFlavoredMarkdown` correctly parses the full wikilink
- Images render properly as `<img>` tags

## Impact
- **Severity:** Medium
- **Affected Users:** Anyone using Obsidian image embeds with `@` in filenames (very common for Retina/High-DPI screenshots)
- **Workarounds:**
  1. Disable `GitHubFlavoredMarkdown` plugin (loses GFM features like autolinks, tables, strikethrough)
  2. Rename images to remove `@` (not practical for auto-generated screenshot names)
  3. Use standard markdown image syntax instead of Obsidian wikilinks (breaks Obsidian portability)

## Solution Options

### Option 1: Disable Autolink Literals in remark-gfm (Recommended)
Modify the `GitHubFlavoredMarkdown` plugin to disable the autolink literal extension while keeping other GFM features:

```typescript
// In quartz/plugins/transformers/gfm.ts
export const GitHubFlavoredMarkdown: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "GitHubFlavoredMarkdown",
    markdownPlugins() {
      return opts.enableSmartyPants
        ? [
            [remarkGfm, {
              singleTilde: false,
              // Disable autolink literal to prevent @ symbol conflicts
              autolink: false
            }],
            smartypants
          ]
        : [[remarkGfm, { singleTilde: false, autolink: false }]]
    },
    // ... rest of plugin
  }
}
```

**Tradeoff:** Users lose automatic URL and email autolink detection, but this is likely less critical than image embeds.

### Option 2: Process Obsidian Wikilinks First
Change the default plugin order to process `ObsidianFlavoredMarkdown` before `GitHubFlavoredMarkdown`:

```typescript
// In quartz.config.ts
transformers: [
  Plugin.FrontMatter(),
  Plugin.CreatedModifiedDate({...}),
  Plugin.SyntaxHighlighting({...}),
  Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),  // Process first
  Plugin.GitHubFlavoredMarkdown(),  // Then GFM
  // ...
]
```

**Limitation:** This may not fully work because both plugins modify the markdown AST, and the ordering at the remark plugin level matters more than plugin definition order.

### Option 3: Escape @ in Wikilinks (User-Facing)
Document that users should escape `@` symbols in Obsidian wikilinks:

```markdown
![[CleanShot 2025-10-19 at 17.35.29\@2x.png]]
```

**Limitation:** Not practical; users don't control auto-generated screenshot filenames in Obsidian.

### Option 4: Add Configuration Option
Add a configuration option to disable autolink literals:

```typescript
export interface Options {
  enableSmartyPants: boolean
  linkHeadings: boolean
  enableAutolinkLiterals: boolean  // New option, default true
}
```

**Benefit:** Gives users flexibility without breaking existing behavior.

## Recommended Fix
**Implement Option 1 or Option 4** to disable autolink literal parsing by default or add a configuration option.

The autolink literal feature (auto-detecting URLs and emails) is a nice-to-have enhancement, while breaking Obsidian image embeds is a critical regression for users publishing Obsidian vaults.

## Reproduction Steps

1. Create a Quartz site with default configuration (including both plugins)
2. Copy an Obsidian vault with images into the content folder
3. Include an image embed with `@` in the filename:
   ```markdown
   ![[Screenshot@2x.png]]
   ```
4. Run `npx quartz build`
5. Check the generated HTML - image will render as broken alias, not as `<img>` tag

## Files Involved
- `quartz/plugins/transformers/ofm.ts` - ObsidianFlavoredMarkdown plugin
- `quartz/plugins/transformers/gfm.ts` - GitHubFlavoredMarkdown plugin
- `quartz/config.ts` - Default plugin configuration
- `node_modules/remark-gfm/` - Dependency with autolink literal extension

## Additional Notes

### Why This Matters for Obsidian Integration
Obsidian's auto-generated screenshot filenames commonly include `@2x`, `@3x` suffixes for Retina display support. The default Quartz template and documentation encourage using symlinks or copying Obsidian vaults directly into Quartz, making this a common real-world scenario.

### Testing
This issue can be tested by:
1. Running Quartz with both plugins enabled (default)
2. Adding an image with `@` in filename
3. Verifying the output is broken (not an `<img>` tag)

Then testing the fix:
1. Disabling autolink literals in remark-gfm
2. Running the same test
3. Verifying the output is correct

## Conclusion
This is a plugin interaction bug that should be addressed to ensure Obsidian vault publishing works reliably with the default configuration. The fix is straightforward and has minimal impact on other features.

---

**Report submitted by:** Aníbal Rojas
**Date:** October 20, 2025
**Reproduction environment:** macOS, Quartz 4.5.2, Obsidian vault publishing workflow
