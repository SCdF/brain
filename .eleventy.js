const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // Copy images and static assets as-is
  eleventyConfig.addPassthroughCopy("content/**/*.png");
  eleventyConfig.addPassthroughCopy("content/**/*.jpg");
  eleventyConfig.addPassthroughCopy("content/**/*.jpeg");
  eleventyConfig.addPassthroughCopy("content/**/*.gif");

  // Add RSS plugin
  eleventyConfig.addPlugin(pluginRss);

  // Create a collection from all markdown files in content/
  eleventyConfig.addCollection("notes", (collection) => {
    return collection.getFilteredByGlob("content/**/*.md").sort((a, b) => {
      return b.date - a.date; // newest first
    });
  });

  return {
    dir: {
      input: "content", // where your markdown lives
      includes: "../_includes",
      layouts: "../_layouts",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
