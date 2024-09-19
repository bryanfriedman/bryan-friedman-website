module.exports = (function () {
    settings = 
    {
        markdownTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "dist",
            layouts: "_layouts",
        }
    };
    return settings;
})();