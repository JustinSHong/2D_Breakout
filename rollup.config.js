// Rollup plugins
import babel from "rollup-plugin-babel";
import eslint from "rollup-plugin-eslint";
import uglify from "rollup-plugin-uglify";

export default {
	entry: "public/js/game.js",
	dest: "build/js/main.min.js",
	format: "iife",
	sourceMap: "inline",
	plugins: [
		babel({
			exclude: "node_modules/**"
		}),
		uglify.uglify()
	]
};
