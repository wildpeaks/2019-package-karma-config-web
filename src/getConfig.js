/* eslint-env node */
/* eslint-disable no-process-env */
"use strict";
const {strictEqual} = require("assert");
const puppeteer = require("puppeteer");

if (process && process.env) {
	process.env.CHROME_BIN = puppeteer.executablePath();
}

/**
 * @typedef Config
 * @param {String|String[]} files Glob pattern of the tests
 * @param {Object?} webpack Webpack config
 */

/**
 * Generates a config for Karma.
 * @param {Config} options
 */
function getConfig({files = "src/**/*.spec.js", webpack} = {}) {
	//region Files
	const patterns = typeof files === "string" ? [files] : files;
	if (!Array.isArray(patterns)) {
		throw new Error('"files" should be a String, or an Array of String');
	}
	const l = patterns.length;
	if (l === 0) {
		throw new Error('"files" should not be an empty Array');
	}
	for (const pattern of patterns) {
		if (typeof pattern !== "string") {
			throw new Error('"files" should be a String, or an Array of String');
		}
		if (pattern === "") {
			throw new Error('"files" should not have an empty String');
		}
	}
	//endregion
	//region Base config
	const config = {
		mime: {},
		browsers: ["ChromeHeadless"],
		frameworks: ["jasmine"],
		client: {
			jasmine: {
				random: true,
				seed: "4321",
				stopOnFailure: true,
				failFast: true
			}
		},
		files: patterns
	};
	//endregion
	//region Webpack
	strictEqual(webpack === null, false, '"webpack" should not be null');
	strictEqual(Array.isArray(webpack), false, '"webpack" should not be an Array');
	strictEqual(webpack instanceof Promise, false, '"webpack" should not be a Promise');
	strictEqual(webpack instanceof RegExp, false, '"webpack" should not be a RegExp');
	strictEqual(webpack instanceof Symbol, false, '"webpack" should not be a Symbol');
	strictEqual(
		typeof webpack === "object" || typeof webpack === "undefined",
		true,
		'"webpack" should be an Object or be undefined'
	);
	if (typeof webpack === "object") {
		// https://github.com/karma-runner/karma-chrome-launcher/issues/176#issuecomment-381642145
		config.mime["text/x-typescript"] = ["ts", "tsx"];

		const webpackCopy = Object.assign({}, webpack);
		delete webpackCopy.entry;
		delete webpackCopy.optimization;
		config.webpack = webpackCopy;
		config.webpackMiddleware = {
			logLevel: "silent"
		};
		if (typeof webpackCopy.mode === "undefined") {
			webpackCopy.mode = "development";
		}

		const preprocessors = {};
		for (const pattern of patterns) {
			preprocessors[pattern] = ["webpack", "sourcemap"];
		}
		config.preprocessors = preprocessors;
	}
	//endregion
	return config;
}

module.exports = getConfig;
