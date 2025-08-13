import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "posts", // iterate over `collections.posts`
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
      return pluginRss.dateToRfc3339(dateObj).split("T")[0]; // Simple YYYY-MM-DD
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
