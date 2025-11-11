import { QuartzTransformerPlugin } from "../types"
import { FullSlug, joinSegments } from "../../util/path"

export interface Options {}

const defaultOptions: Options = {}

/**
 * DraftPrefix Transformer Plugin
 *
 * Prepends "draft/" to the slug of any note with `draft: true` in frontmatter.
 * This publishes draft notes under a separate URL namespace for sharing before
 * official publication.
 *
 * Features:
 * - Flattens structure: content/blog/2025-10/post.md → draft/post
 * - Honors custom slugs: if slug: my-custom → draft/my-custom
 * - Only affects notes with draft: true in frontmatter
 *
 * Plugin order: Must run AFTER CustomSlug transformer so custom slugs
 * are already applied before we add the draft/ prefix.
 */
export const DraftPrefix: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "DraftPrefix",
    markdownPlugins() {
      return [
        () => {
          return (_, file) => {
            // Check if this file is marked as a draft
            const isDraft =
              file.data.frontmatter?.draft === true ||
              file.data.frontmatter?.draft === "true"

            if (isDraft && file.data.slug) {
              // Extract just the last segment (filename) to flatten the structure
              const slugSegments = file.data.slug.split("/")
              const lastSegment = slugSegments[slugSegments.length - 1]

              // Prepend "draft/" to create the new slug
              // This honors custom slugs (if CustomSlug ran before us)
              // and flattens the folder structure
              file.data.slug = joinSegments("draft", lastSegment) as FullSlug

              // Mark this file as a draft in the data for components to check
              file.data.isDraft = true
            }
          }
        },
      ]
    },
  }
}
