import fetch from "node-fetch";

function getYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default function(eleventyConfig) {

    eleventyConfig.addShortcode('youtube', function(url) {
		const iframeMarkup = 
            '<div class="video-container">'
			//+ '<iframe width="750" height="422" data-src="//www.youtube.com/embed/' 
            + '<lite-youtube videoid="'
			+ getYoutubeId(url) 
            + '" playlabel="Play: Crayon Physics Deluxe - Trailer HD" style="background-image: url(\'https://i.ytimg.com/vi_webp/'+getYoutubeId(url)+'/maxresdefault.webp\');"></lite-youtube>'
			//+ '" frameborder="0" allowfullscreen></iframe>'
            + '</div>';
	
		return iframeMarkup;
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