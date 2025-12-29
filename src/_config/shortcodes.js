function getYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function extractTweetId(url) {
    const m = String(url).match(/\/status\/(\d+)/);
    return m ? m[1] : null;
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

    eleventyConfig.addShortcode("tweet", function (url) {
        const id = extractTweetId(url);
        if (!id) return "";

        return `
    <div class="tweet-shell" data-tweet-id="${id}" data-tweet-url="${url}">
      <div class="tweet-shell__placeholder">
        <p class="tweet-shell__label">Tweet loading…</p>
        <a class="tweet-shell__link" href="${url}" rel="noopener noreferrer">Open on X</a>
      </div>
    </div>
    `.trim();
    });

}
