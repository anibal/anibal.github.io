import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"

export default (() => {
  const DraftBanner: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
    // Check if this is a draft page
    const isDraft = fileData.slug?.startsWith("draft/") ?? false

    // Don't render anything if not a draft
    if (!isDraft) {
      return null
    }

    const title = fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title

    return (
      <div class="draft-banner">
        <div class="draft-banner-content">
          <span class="draft-label">DRAFT:</span> {title}
        </div>
      </div>
    )
  }

  DraftBanner.css = `
.draft-banner {
  background-color: var(--highlight);
  border-left: 4px solid var(--secondary);
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
}

.draft-banner-content {
  font-weight: 600;
  color: var(--darkgray);
  font-size: 0.95rem;
}

.draft-label {
  color: var(--secondary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
`

  return DraftBanner
}) satisfies QuartzComponentConstructor
