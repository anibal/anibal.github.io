# Multilingual Implementation Plan

This document outlines the systematic implementation of English/Spanish multilingual support for the Quartz site.

## Overview

| Aspect | Decision |
|--------|----------|
| Content structure | Spanish at root (`/`), English in `/en/` |
| UI locale | Fixed Spanish UI regardless of content language |
| Languages | English + Spanish only (extensible design) |
| Navigation | Language-filtered (Explorer, RecentNotes, Tags) |
| Tag pages | Separate per language (`/tags/*` and `/en/tags/*`) |
| Language detection | Path-based: `slug.startsWith("en/")` = English, else Spanish |

---

## Content Organization

```
content/
├── index.md              # Spanish homepage
├── articulo.md           # Spanish articles (existing)
├── 2024/                 # Spanish content by year
│   └── mi-post.md
└── en/
    ├── index.md          # English homepage
    ├── article.md        # English translations
    └── 2024/             # English content by year
        └── my-post.md
```

### Frontmatter Schema for Translations

```yaml
# Spanish article: content/2024/mi-post.md
---
title: Mi Post
lang: es
translations:
  en: en/2024/my-post
---

# English translation: content/en/2024/my-post.md
---
title: My Post
lang: en
translations:
  es: 2024/mi-post
---
```

---

## Implementation Phases

### Phase 1: Core Infrastructure

#### Step 1.1: Language Utility Module
- [ ] Create `quartz/util/multilang.ts`

```typescript
import { FullSlug } from "./path"

export type SupportedLanguage = "es" | "en"

export const DEFAULT_LANGUAGE: SupportedLanguage = "es"

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  es: "Español",
  en: "English",
}

/**
 * Detect language from slug based on path prefix
 */
export function getLanguage(slug: FullSlug): SupportedLanguage {
  return slug.startsWith("en/") ? "en" : "es"
}

/**
 * Check if slug belongs to English content
 */
export function isEnglish(slug: FullSlug): boolean {
  return slug.startsWith("en/")
}

/**
 * Check if two slugs are in the same language
 */
export function isSameLanguage(slug1: FullSlug, slug2: FullSlug): boolean {
  return getLanguage(slug1) === getLanguage(slug2)
}

/**
 * Get display label for a language code
 */
export function getLanguageLabel(lang: SupportedLanguage): string {
  return LANGUAGE_LABELS[lang] ?? lang
}

/**
 * Get the language prefix for URLs (empty for default language)
 */
export function getLanguagePrefix(lang: SupportedLanguage): string {
  return lang === DEFAULT_LANGUAGE ? "" : `${lang}/`
}
```

#### Step 1.2: Extend Frontmatter Types
- [ ] Modify `quartz/plugins/vfile.ts` - Add translations type

Location: Around line 138, in the `DataMap` interface extension:

```typescript
// Add to the Partial<{}> block:
translations: Record<string, string>  // { "en": "en/path/to/translation", "es": "path/to/original" }
```

#### Step 1.3: Parse Translations in Frontmatter
- [ ] Modify `quartz/plugins/transformers/frontmatter.ts`

Location: After line 120 (after `published` handling), add:

```typescript
// Handle translations field
const translations = data.translations
if (translations && typeof translations === "object") {
  data.translations = translations as Record<string, string>
}
```

---

### Phase 2: LanguageSwitcher Component

#### Step 2.1: Create Component
- [ ] Create `quartz/components/LanguageSwitcher.tsx`

```typescript
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, FullSlug } from "../util/path"
import { getLanguage, getLanguageLabel, SupportedLanguage, LANGUAGE_LABELS } from "../util/multilang"
import style from "./styles/languageSwitcher.scss"

interface Options {
  /** Position in the page */
  position?: "header" | "beforeBody"
}

const defaultOptions: Options = {
  position: "beforeBody",
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const LanguageSwitcher: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
    const translations = fileData.frontmatter?.translations as Record<string, string> | undefined
    const currentLang = getLanguage(fileData.slug!)

    // If no translations defined, don't render anything
    if (!translations || Object.keys(translations).length === 0) {
      return null
    }

    // Build list of available languages (current + translations)
    const availableLanguages: Array<{ lang: SupportedLanguage; slug: FullSlug; isCurrent: boolean }> = [
      { lang: currentLang, slug: fileData.slug!, isCurrent: true },
    ]

    for (const [lang, slug] of Object.entries(translations)) {
      availableLanguages.push({
        lang: lang as SupportedLanguage,
        slug: slug as FullSlug,
        isCurrent: false,
      })
    }

    // Sort: current language first, then alphabetically
    availableLanguages.sort((a, b) => {
      if (a.isCurrent) return -1
      if (b.isCurrent) return 1
      return a.lang.localeCompare(b.lang)
    })

    return (
      <nav class="language-switcher" aria-label="Language selection">
        <ul>
          {availableLanguages.map(({ lang, slug, isCurrent }) => (
            <li key={lang}>
              {isCurrent ? (
                <span class="current-lang" aria-current="page">
                  {getLanguageLabel(lang)}
                </span>
              ) : (
                <a href={resolveRelative(fileData.slug!, slug)} hreflang={lang}>
                  {getLanguageLabel(lang)}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  LanguageSwitcher.css = style
  return LanguageSwitcher
}) satisfies QuartzComponentConstructor
```

#### Step 2.2: Create Styles
- [ ] Create `quartz/components/styles/languageSwitcher.scss`

```scss
.language-switcher {
  margin: 0.5rem 0;

  ul {
    display: flex;
    gap: 0.75rem;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.9rem;
  }

  li {
    display: flex;
    align-items: center;

    &:not(:last-child)::after {
      content: "|";
      margin-left: 0.75rem;
      color: var(--gray);
    }
  }

  .current-lang {
    font-weight: 600;
    color: var(--secondary);
  }

  a {
    color: var(--gray);
    text-decoration: none;

    &:hover {
      color: var(--secondary);
      text-decoration: underline;
    }
  }
}
```

#### Step 2.3: Export Component
- [ ] Modify `quartz/components/index.ts`

Add export:
```typescript
export { default as LanguageSwitcher } from "./LanguageSwitcher"
```

#### Step 2.4: Add to Layout
- [ ] Modify `quartz.layout.ts`

In `defaultContentPageLayout.beforeBody`, add after `ArticleTitle`:
```typescript
Component.LanguageSwitcher(),
```

---

### Phase 3: Hreflang SEO Tags

#### Step 3.1: Inject Hreflang Tags
- [ ] Modify `quartz/plugins/emitters/componentResources.ts`

Location: In `addGlobalPageResources()` function, add to `resources.additionalHead`:

```typescript
// Add hreflang tags for multilingual SEO
resources.additionalHead.push((fileData) => {
  const translations = fileData.frontmatter?.translations as Record<string, string> | undefined
  if (!translations || Object.keys(translations).length === 0) {
    return null
  }

  const baseUrl = cfg.baseUrl
  if (!baseUrl) return null

  const currentLang = fileData.slug?.startsWith("en/") ? "en" : "es"
  const currentUrl = `https://${baseUrl}/${fileData.slug}`

  const hreflangTags = [
    // Current page
    <link rel="alternate" hreflang={currentLang} href={currentUrl} />,
    // Translations
    ...Object.entries(translations).map(([lang, slug]) => (
      <link rel="alternate" hreflang={lang} href={`https://${baseUrl}/${slug}`} />
    )),
    // x-default (use current page as default)
    <link rel="alternate" hreflang="x-default" href={currentUrl} />,
  ]

  return <>{hreflangTags}</>
})
```

**Note:** Will need to import the Fragment or use array return. Check existing patterns in the file.

---

### Phase 4: Language-Filtered RecentNotes

#### Step 4.1: Add Language-Aware Option
- [ ] Modify `quartz/components/RecentNotes.tsx`

Add to Options interface (around line 14):
```typescript
interface Options {
  title?: string
  limit: number
  linkToMore: SimpleSlug | false
  showTags: boolean
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
  languageAware?: boolean  // NEW: Filter by current page's language
}
```

Update defaultOptions (around line 23):
```typescript
const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: 3,
  linkToMore: false,
  showTags: true,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
  languageAware: false,  // NEW
})
```

Modify the component function (around line 40) to add language filtering:
```typescript
const RecentNotes: QuartzComponent = ({
  allFiles,
  fileData,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  const opts = { ...defaultOptions(cfg), ...userOpts }

  // Apply language filtering if enabled
  let filteredFiles = allFiles.filter(opts.filter)
  if (opts.languageAware) {
    const currentLang = fileData.slug?.startsWith("en/") ? "en" : "es"
    filteredFiles = filteredFiles.filter((file) => {
      const fileLang = file.slug?.startsWith("en/") ? "en" : "es"
      return fileLang === currentLang
    })
  }

  const pages = filteredFiles.sort(opts.sort)
  // ... rest of component
}
```

#### Step 4.2: Update Layout Configuration
- [ ] Modify `quartz.layout.ts`

Update RecentNotes usage:
```typescript
Component.RecentNotes({
  limit: 5,
  showTags: true,
  linkToMore: "recent/" as SimpleSlug,
  filter: (file) => !file.slug!.startsWith("draft/"),
  languageAware: true,  // NEW
}),
```

---

### Phase 5: Language-Filtered Explorer

#### Step 5.1: Pass Language Context to Explorer
- [ ] Modify `quartz/components/Explorer.tsx`

The Explorer uses client-side filtering via serialized functions. We need to pass the current page's language to the client.

Add data attribute to the explorer div (around line 67):
```typescript
<div
  class={classNames(displayClass, "explorer", "collapsed")}
  data-behavior={opts.folderClickBehavior}
  data-collapsed={opts.folderDefaultState}
  data-savestate={opts.useSavedState}
  data-language-aware="true"  // NEW
  data-data-fns={JSON.stringify({
    order: opts.order,
    sortFn: opts.sortFn.toString(),
    filterFn: opts.filterFn.toString(),
    mapFn: opts.mapFn.toString(),
  })}
>
```

#### Step 5.2: Modify Explorer Inline Script
- [ ] Modify `quartz/components/scripts/explorer.inline.ts`

Location: In the tree-building logic, add language filtering.

Find where nodes are filtered/processed and add:
```typescript
// Get current page language from body data attribute or URL
function getCurrentLanguage(): "es" | "en" {
  const slug = document.body.dataset.slug ?? window.location.pathname.slice(1)
  return slug.startsWith("en/") ? "en" : "es"
}

function isNodeSameLanguage(slug: string): boolean {
  const currentLang = getCurrentLanguage()
  const nodeLang = slug.startsWith("en/") ? "en" : "es"
  return currentLang === nodeLang
}

// Apply this filter during tree construction
// In the recursive tree building, check isNodeSameLanguage before including node
```

**Note:** This requires careful integration with the existing explorer logic. The exact location depends on how the file tree is processed. Look for where `filterFn` is applied and add the language check there.

---

### Phase 6: Language-Aware Tag Pages

#### Step 6.1: Modify Tag Page Emitter
- [ ] Modify `quartz/plugins/emitters/tagPage.tsx`

This is the most complex change. The tag page emitter needs to:
1. Generate separate tag pages for each language
2. Filter content by language when building tag listings
3. Use language-prefixed slugs for English tags (`en/tags/...`)

Location: Modify `computeTagInfo()` function (around line 20):

```typescript
function computeTagInfo(
  allFiles: QuartzPluginData[],
  content: ProcessedContent[],
  locale: keyof typeof TRANSLATIONS,
  language: "es" | "en",  // NEW parameter
): [Set<string>, Record<string, ProcessedContent>] {
  // Filter files by language first
  const languageFiles = allFiles.filter((file) => {
    const fileLang = file.slug?.startsWith("en/") ? "en" : "es"
    return fileLang === language
  })

  const tags: Set<string> = new Set(
    languageFiles.flatMap((data) => data.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes),
  )
  // ... rest of function, using languageFiles instead of allFiles
}
```

Location: Modify `emit()` function (around line 124):

```typescript
async *emit(ctx, content, resources) {
  const cfg = ctx.cfg.configuration

  // Generate tag pages for Spanish (default)
  const allFilesEs = content
    .map((c) => c[1].data)
    .filter((file) => !file.slug!.startsWith("draft/") && !file.slug!.startsWith("en/"))
  const [tagsEs, tagDescriptionsEs] = computeTagInfo(allFilesEs, content, cfg.locale, "es")

  for (const tag of tagsEs) {
    yield processTagPage(ctx, tag, tagDescriptionsEs[tag], allFilesEs, opts, resources)
  }

  // Generate tag pages for English (prefixed with en/)
  const allFilesEn = content
    .map((c) => c[1].data)
    .filter((file) => !file.slug!.startsWith("draft/") && file.slug!.startsWith("en/"))
  const [tagsEn, tagDescriptionsEn] = computeTagInfo(allFilesEn, content, cfg.locale, "en")

  for (const tag of tagsEn) {
    // Prefix English tag pages with "en/"
    yield processTagPage(ctx, `en/${tag}`, tagDescriptionsEn[tag], allFilesEn, opts, resources)
  }
}
```

**Note:** Also need to update `partialEmit()` similarly for watch mode.

---

### Phase 7: Integration & Testing

#### Step 7.1: Ensure Body Has Slug Data
- [ ] Verify `quartz/components/renderPage.tsx` passes slug to body

Check that `document.body.dataset.slug` is set. If not, add:
```typescript
<body data-slug={slug}>
```

#### Step 7.2: Create Test Content
- [ ] Create test English content

Create `content/en/index.md`:
```yaml
---
title: Home
lang: en
translations:
  es: index
---

Welcome to the English version of the site.
```

Create `content/en/test-article.md`:
```yaml
---
title: Test Article
lang: en
tags:
  - test
translations:
  es: articulo-prueba
---

This is a test article in English.
```

Create corresponding Spanish article `content/articulo-prueba.md`:
```yaml
---
title: Articulo de Prueba
lang: es
tags:
  - test
translations:
  en: en/test-article
---

Este es un articulo de prueba en Español.
```

#### Step 7.3: Test Checklist
- [ ] Build succeeds: `npx quartz build`
- [ ] Spanish pages show only Spanish content in Explorer
- [ ] English pages show only English content in Explorer
- [ ] RecentNotes filters by language
- [ ] LanguageSwitcher appears on pages with translations
- [ ] LanguageSwitcher links work correctly
- [ ] Tag page `/tags/test` shows only Spanish posts
- [ ] Tag page `/en/tags/test` shows only English posts
- [ ] View source shows correct hreflang tags
- [ ] No console errors in browser

---

## File Summary

### New Files (4)
| File | Purpose |
|------|---------|
| `quartz/util/multilang.ts` | Language detection utilities |
| `quartz/components/LanguageSwitcher.tsx` | Translation links component |
| `quartz/components/styles/languageSwitcher.scss` | Component styling |
| `content/en/index.md` | English homepage (test) |

### Modified Files (8)
| File | Changes |
|------|---------|
| `quartz/plugins/vfile.ts` | Add `translations` type |
| `quartz/plugins/transformers/frontmatter.ts` | Parse `translations` field |
| `quartz/plugins/emitters/componentResources.ts` | Hreflang injection |
| `quartz/plugins/emitters/tagPage.tsx` | Language-prefixed tag pages |
| `quartz/components/index.ts` | Export LanguageSwitcher |
| `quartz/components/RecentNotes.tsx` | `languageAware` option |
| `quartz/components/scripts/explorer.inline.ts` | Language filtering |
| `quartz.layout.ts` | Add LanguageSwitcher, enable language-aware options |

---

## Notes & Gotchas

1. **Explorer filtering is client-side** - The `filterFn` is serialized and runs in browser. Language filtering must integrate with this mechanism carefully.

2. **Tag page slug generation** - English tag pages need `en/` prefix in their slugs. The `processTagPage` function uses `joinSegments("tags", tag)` which needs adjustment.

3. **Link resolution** - The `resolveRelative` function should work correctly with language-prefixed slugs, but verify cross-language links resolve properly.

4. **Incremental builds** - The `partialEmit()` functions in tag page emitter need similar language-aware logic for watch mode to work correctly.

5. **Search index** - The search will still show all languages mixed. If language-filtered search is needed later, that's a separate enhancement to `contentIndex.tsx`.

6. **RSS feeds** - Currently generates a single RSS feed. Could be extended to generate per-language feeds later.

---

## Future Enhancements

- [ ] Language-filtered search results
- [ ] Per-language RSS feeds
- [ ] Automatic language detection from browser `Accept-Language`
- [ ] Language toggle in mobile menu
- [ ] Folder pages language filtering
- [ ] "Also available in" callout component

---

*Last updated: 2024-12-18*
