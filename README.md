# Bryan Friedman Website

## A Brief History

Having built and customized quite a few websites using [WordPress](https://wordpress.org) over the years, my self-hosted personal website/blog was naturally powered by WordPress for a long time as well. However, I became aware of [Jamstack](https://jamstack.org) in a previous job and was intrigued by it. Later in my career, I led a team where we built a [Hugo](https://gohugo.io) site and hosted it on [Netlify](https://www.netlify.com). I _really_ liked the whole experience and became curious about other [Static Site Generators](https://jamstack.org/generators/). After experimenting with a few [React](https://react.dev)-based ones, I stumbled on [Eleventy](https://www.11ty.dev) and I liked the balance it struck between the JavaScript ecosystem and the experience I had with Hugo. So I thought the best way to learn was to rebuild my site using Eleventy, so here we are.

 I owe a debt of gratitude to those code bases that I referenced as I learned to build this site. That includes the [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog) starter site, and the [Start Bootstrap Clean Blog](https://github.com/StartBootstrap/startbootstrap-clean-blog) theme, both of which I borrowed from heavily (and credited in the included license).

## Building the Site

Assuming you have Node and `npm` installed already, the `package.json` file includes all the scripts required to build the site for local development or production deployment.

To build and run the site locally, use:

```
npm run dev
```

Or to build it for production deployment, run:

```
npm run build
```

## Folder Structure

In deciding how to structure the project, I used some combination of the tips outlined in [this post](https://www.njfamirm.ir/en/blog/eleventy-folder-structure-guide/) and [this post](https://www.webstoemp.com/blog/eleventy-projects-structure/) with a little of my own opinion mixed in. As such, the structure is as follows:

```
├── dist            # Output folder (for development)
├── public          # Deployment folder (for production)     
└── src             # Main input folder
    ├── _config     # Config scripts to be included in `eleventy.config.js` at the root
    ├── _data       # Global data files
    ├── _includes   # Partial templates
    ├── _layouts    # Page layouts
    ├── assets      # Static and processed assets handled by build process or passthrough copy
    └── content     # Content of the site, including Nunjucks templates and Markdown files
```

Some of this is self-explanatory (if you know Eleventy), but I've included a few details on some of them below.

### `_config`

I really liked the idea of a clean and more readable `eleventy.config.js` file and so I followed some tips from [this post](https://www.lenesaile.com/en/blog/organizing-the-eleventy-config-file/) and pulled out separate configurations into their own files to be called from the root config file by using the `addPlugin` mechanism. This directory has a different file for each configuration type including event hooks, filters, plugins, and shortcodes, as well as custom template format and extension settings for processing Sass, minifying code for production, and amending the Markdown rendering library as needed.

### `_data`

This is the global data file directory as normal in Eleventy, which houses some metadata and a helper function for outputing the current year in the footer. Oone additional note  is that I followed the advice on [this post](https://www.roboleary.net/webdev/2024/01/24/eleventy-production-flag.html) to create a global data flag for when the build is for Production to determine when to minify code, among other things.

### `assets`

All the folders within here are copied to the root of of the output folder, shedding the `assets` folder, which is only used to help separate from other content and files under the input directory. This includes the `img` folder, which gets copied via passthrough for images that aren't already stored in the same folder as the content (see below), the `js` folder which is copied via passthrough for local development but gets run through minification first for production, and finally, the `scss` folder containing the Sass style templates that get compiled into CSS and copied to the `css` folder. 

### `content`

I really wanted to keep the content (page templates and markdown) inside of this separate directory as outlined in [this post](https://www.webstoemp.com/blog/eleventy-projects-structure/) referenced above. But then I didn't want an extra subdirectory in the output folder that would cause longer URLs unnecessarily. So I had to build some extra functionality that I discovered to allow this directory to be stripped in the output folder. In `/src/content/content.json`, a custom filter is used to rewrite the `permalink` value for each content file within to remove `content` from the path. There's also a modified version of the `eleventy-plugin-page-assets` plugin so that it copies images that are alongside the Markdown content within this folder, since a passthrough copy would have otherwise copied over the `content` folder as well.