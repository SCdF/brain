const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Copy images from your Obsidian vault through to the site
  eleventyConfig.addPassthroughCopy("content/**/*.{png,jpg,jpeg,gif,svg,webp}");

  // Collection of all markdown notes (newest first)
  eleventyConfig.addCollection("notes", (api) =>
    api
      .getFilteredByGlob("content/**/*.md")
      .filter((item) => item.inputPath !== "content/index.md")
      .sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: "content", // process files in /content
      includes: "../_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
