const fetch = require("node-fetch");
const axios = require('axios');
const dotenv = require('dotenv').config();

const apiUrl = 'https://www.googleapis.com/youtube/v3';

function getYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

async function getYoutubeTitle(videoId, apiKey) {
  try {
    var reqUrl = apiUrl + '/videos?part=snippet&id=' + videoId + '&key=' + process.env.YOUTUBE_APIKEY;
    const response = await axios.get(reqUrl);
    return response.data.items[0].snippet.title;
  } catch (error) {
    console.error("Error getting YouTube title: " + error);
    return "";
  }
}

module.exports = function(eleventyConfig) {

    eleventyConfig.addShortcode('youtube', async function(url) {
        var id = getYoutubeId(url);
        let title = await getYoutubeTitle(id);
		const html = 
            '<div class="video-container">'
			//+ '<iframe width="750" height="422" data-src="//www.youtube.com/embed/' 
            + '<lite-youtube videoid="'+id
            + '" title="'+title
            + '""></lite-youtube>'
			//+ '" frameborder="0" allowfullscreen></iframe>'
            + '</div>';

		return html;
	});

    eleventyConfig.addShortcode('tweet', async function(url) {
        try {
            var { html } = await fetch("https://publish.twitter.com/oembed?align=center&omit_script=true&url=" + url).then(res => res.json());
            return html;
        }
        catch (err) {
            console.error("Error getting tweet: " + url);
            return "";
        }
        
    });

}