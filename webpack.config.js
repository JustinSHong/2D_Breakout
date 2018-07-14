module.exports = {
	entry: "./public/js/game.js", // primary source file
	output: {
		filename: "./dist/bundle.js" // specify the path and filename we want webpack to generate
		// bundle.js is the JS that index.html will include and execute at run-time
	}
};
