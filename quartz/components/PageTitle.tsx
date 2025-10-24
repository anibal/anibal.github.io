import { pathToRoot, joinSegments } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const subtitle = cfg?.pageSubtitle

  return (
    <div class={classNames(displayClass, "page-title-container")}>
      <h2 class="page-title">
        <a href={baseDir}>{title}</a>
      </h2>
      {subtitle && <h3 class="page-subtitle">{subtitle}</h3>}
    </div>
  )
}

PageTitle.css = `
.page-title-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}

.page-title a {
  text-decoration: none;
  color: inherit;
}

.page-subtitle {
  font-size: 1.12rem;
  margin: 0;
  font-family: var(--headerFont);
  color: var(--dark);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
