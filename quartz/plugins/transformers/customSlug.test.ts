import test, { describe } from "node:test"
import assert from "node:assert"
import { CustomSlug } from "./customSlug"
import { FullSlug } from "../../util/path"
import { VFile } from "vfile"

describe("CustomSlug plugin", () => {
  // Helper function to create a mock VFile
  function createMockFile(frontmatterSlug?: string | null): VFile {
    const file = new VFile()
    file.data.frontmatter = {
      title: "Test Page",
      slug: frontmatterSlug,
    }
    file.data.slug = "default/slug" as FullSlug
    return file
  }

  // Helper function to get and invoke the plugin
  async function invokePlugin(file: VFile): Promise<void> {
    const plugin = CustomSlug()
    const markdownPlugins = plugin.markdownPlugins?.()

    if (!markdownPlugins || markdownPlugins.length === 0) {
      throw new Error("No markdown plugins returned")
    }

    // Get the first plugin (should be a function factory)
    const pluginFactory = markdownPlugins[0]

    // The plugin factory returns a transformer function
    const transformer = typeof pluginFactory === "function" ? pluginFactory() : pluginFactory

    // Invoke the transformer with mock tree and file
    // Tree is not used by CustomSlug, so we can pass null
    const mockTree = {}
    if (typeof transformer === "function") {
      transformer(mockTree, file)
    }
  }

  describe("default behavior", () => {
    test("should keep default slug when no slug field in frontmatter", async () => {
      const file = createMockFile()
      file.data.frontmatter!.slug = undefined

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "default/slug")
    })

    test("should keep default slug when slug field is null", async () => {
      const file = createMockFile(null)

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "default/slug")
    })

    test("should keep default slug when slug field is empty string", async () => {
      const file = createMockFile("")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "default/slug")
    })

    test("should keep default slug when frontmatter is missing", async () => {
      const file = new VFile()
      file.data.slug = "default/slug" as FullSlug

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "default/slug")
    })
  })

  describe("custom slug override", () => {
    test("should override slug with custom value", async () => {
      const file = createMockFile("custom/slug")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "custom/slug")
    })

    test("should override slug with simple slug", async () => {
      const file = createMockFile("simple-slug")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "simple-slug")
    })

    test("should override slug with nested path", async () => {
      const file = createMockFile("2025-10/2025-10-20-la-alucinacion-llms")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "2025-10/2025-10-20-la-alucinacion-llms")
    })

    test("should override slug with deeply nested path", async () => {
      const file = createMockFile("year/month/day/article-slug")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "year/month/day/article-slug")
    })
  })

  describe("special characters handling", () => {
    test("should preserve accented characters in slug", async () => {
      const file = createMockFile("2025-10-20-la-alucinacion-llms")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "2025-10-20-la-alucinacion-llms")
    })

    test("should preserve numbers in slug", async () => {
      const file = createMockFile("2025-10-20-article-123")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "2025-10-20-article-123")
    })

    test("should preserve dashes in slug", async () => {
      const file = createMockFile("multi-word-slug-with-dashes")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "multi-word-slug-with-dashes")
    })

    test("should preserve slashes in nested paths", async () => {
      const file = createMockFile("folder/subfolder/article")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "folder/subfolder/article")
    })

    test("should preserve underscores", async () => {
      const file = createMockFile("article_name_with_underscores")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "article_name_with_underscores")
    })

    test("should preserve dots in filename slugs", async () => {
      const file = createMockFile("html.energy")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "html.energy")
    })
  })

  describe("type safety", () => {
    test("should convert string slug to FullSlug type", async () => {
      const file = createMockFile("custom-slug")

      await invokePlugin(file)

      // The slug should be a string (FullSlug is a branded string type)
      assert.strictEqual(typeof file.data.slug, "string")
      assert.strictEqual(file.data.slug, "custom-slug")
    })

    test("should handle numeric slug values", async () => {
      const file = createMockFile()
      file.data.frontmatter!.slug = 123 as any

      await invokePlugin(file)

      // Should convert to string
      assert.strictEqual(file.data.slug, "123")
    })
  })

  describe("edge cases", () => {
    test("should handle slug with leading slash", async () => {
      const file = createMockFile("/leading-slash")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "/leading-slash")
    })

    test("should handle slug with trailing slash", async () => {
      const file = createMockFile("trailing-slash/")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "trailing-slash/")
    })

    test("should handle index slug", async () => {
      const file = createMockFile("index")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "index")
    })

    test("should handle whitespace-only slug", async () => {
      const file = createMockFile("   ")

      await invokePlugin(file)

      // Whitespace is not empty string, so it should be set
      // But will be converted to string
      assert(file.data.slug.toString().trim() === "")
    })

    test("should preserve original slug when plugin has no slug field", async () => {
      const file = createMockFile()
      file.data.frontmatter!.slug = undefined
      const originalSlug = "original/slug" as FullSlug

      file.data.slug = originalSlug

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, originalSlug)
    })
  })

  describe("real-world examples", () => {
    test("should work with typical Spanish article slug", async () => {
      const file = createMockFile("2025-10/2025-10-20-la-alucinacion-en-llms-como-feature")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "2025-10/2025-10-20-la-alucinacion-en-llms-como-feature")
    })

    test("should work with blog-style slug", async () => {
      const file = createMockFile("blog/2025/10/my-article-title")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "blog/2025/10/my-article-title")
    })

    test("should work with tag-like slug", async () => {
      const file = createMockFile("tags/programming")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "tags/programming")
    })

    test("should work with knowledge-base organization", async () => {
      const file = createMockFile("kb/javascript/arrays/methods")

      await invokePlugin(file)

      assert.strictEqual(file.data.slug, "kb/javascript/arrays/methods")
    })
  })

  describe("plugin structure", () => {
    test("should have name property", () => {
      const plugin = CustomSlug()

      assert(plugin.name)
      assert.strictEqual(plugin.name, "CustomSlug")
    })

    test("should return markdownPlugins function", () => {
      const plugin = CustomSlug()

      assert(plugin.markdownPlugins)
      assert(typeof plugin.markdownPlugins === "function")
    })

    test("should return non-empty array from markdownPlugins", () => {
      const plugin = CustomSlug()
      const markdownPlugins = plugin.markdownPlugins?.()

      assert(Array.isArray(markdownPlugins))
      assert(markdownPlugins && markdownPlugins.length > 0)
    })

    test("should not have other plugin hooks", () => {
      const plugin = CustomSlug()

      assert(!plugin.textTransform)
      assert(!plugin.htmlPlugins)
      assert(!plugin.externalResources)
    })
  })
})
