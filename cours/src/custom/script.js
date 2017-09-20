Reveal.initialize({
	controls        : false,
	transition      : 'convex', // none/fade/slide/convex/concave/zoom
	transitionSpeed : 'fast',
	progress        : true,
	history         : true,
	center          : true,
	slideNumber     : true,
	dependencies : [
		{ src : '../src/reveal.js/lib/js/classList.js',         condition: function() { return !document.body.classList; } },
		{ src : '../src/reveal.js/plugin/markdown/marked.js',   condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src : '../src/reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src : '../src/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
		{ src : '../src/reveal.js/plugin/zoom-js/zoom.js',        async: true, condition: function() { return !!document.body.classList; } },
		{ src : '../src/reveal.js/plugin/notes/notes.js',         async: true, condition: function() { return !!document.body.classList; } }
	]
});