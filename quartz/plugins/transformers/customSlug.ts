import { FullSlug, joinSegments } from "../../util/path"
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
              // Extract folder path from the file's relative path
              const relativePath = file.data.relativePath
              const pathSegments = relativePath.split("/")

              // Get all segments except the last one (the filename)
              const folderSegments = pathSegments.slice(0, -1)

              // Combine folder path with custom slug
              const finalSlug = joinSegments(...folderSegments, customSlug.toString()) as FullSlug

              file.data.slug = finalSlug
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
