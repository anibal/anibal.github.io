import { FullSlug } from "../../util/path"
import { QuartzTransformerPlugin } from "../types"

export interface Options {
  // No options for now, can add validation options later
}

export const CustomSlug: QuartzTransformerPlugin<Partial<Options>> = () => {
  return {
    name: "CustomSlug",
    markdownPlugins() {
      return [
        () => {
          return (_, file) => {
            const customSlug = file.data.frontmatter?.slug

            if (customSlug != null && customSlug.toString() !== "") {
              // Validate and convert to FullSlug
              file.data.slug = customSlug.toString() as FullSlug
            }
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    frontmatter: {
      slug?: string
    }
  }
}
