import { DateTime } from "luxon";

export default function(eleventyConfig) {
    
	// Filters for displaying dates 
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		if (typeof dateObj == "string")
			return DateTime.fromISO(dateObj, { zone: zone || "utc" }).toFormat(format || "LLLL, d yyyy");
		else
			return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "LLLL, d yyyy");
	});
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		if (typeof dateObj == "string")
			return DateTime.fromISO(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
		else
			return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Return all the topics used in a collection
	eleventyConfig.addFilter("getAllTopics", collection => {
		let topicSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(topic => topicSet.add(topic));
		}
		return Array.from(topicSet).sort();
	});

	// Filter out 'posts' tag from the topics list
	eleventyConfig.addFilter("filterTopicList", function filterTopicList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	// For the content.json file to keep content folder structure but filter out the unwanted parts of the path
	eleventyConfig.addFilter("dropContentFolder", function (path) {
		if (path.endsWith("/index")) {
            path = path.substring(0, path.length-6);
        }
        const pathToDrop = "/content"
        if (path.indexOf(pathToDrop) !== 0) {
            return path;
        }
        return path.slice(pathToDrop.length)
    })
}