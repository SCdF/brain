import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";
import markdownItRegexp from "markdown-it-regexp";

// Wikilink plugin: [[foo]] => <a href="/foo.html">foo</a>
const wikilinkPlugin = markdownItRegexp(/\[\[([^\]]+)\]\]/g, (match) => {
  // wikilink is an array of capture groups
  const text = match[1];
  const slug = text.trim().replace(/\s+/g, "-").toLowerCase();
  return `<a href="/${slug}">${text}</a>`;
});

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "notes", // iterate over `collections.notes`
      limit: 10, // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "Stefan du Fresne",
      subtitle: "Hello there.",
      base: "https://brain.sdufresne.info/",
      author: {
        name: "Stefan du Fresne",
        email: "", // Optional
      },
    },
  });

  // Add a date filter usable in Nunjucks
  eleventyConfig.addFilter(
    "dateFormat",
    function (dateObj, format = "yyyy-LL-dd") {
      return dateObj.toISOString().split("T")[0]; // Simple YYYY-MM-DD
    }
  );

  // Copy images through to site
  eleventyConfig.addPassthroughCopy("content/**/*.{png,jpg,jpeg,gif,svg,webp}");

  // Collection of notes
  eleventyConfig.addCollection("notes", (api) =>
    api
      .getFilteredByGlob("content/**/*.md")
      .filter((item) => !item.inputPath.endsWith("index.md"))
      .sort((a, b) => b.date - a.date)
  );

  // Configure markdown-it with the wikilink plugin
  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true }).use(wikilinkPlugin)
  );

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}
