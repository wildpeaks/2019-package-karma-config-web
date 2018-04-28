/* eslint-env node */
/* eslint-disable no-process-env */
'use strict';
const puppeteer = require('puppeteer');

if (process && process.env){
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
function getConfig({files = 'src/**/*.spec.ts', webpack} = {}){
	//region Base config
	const patterns = Array.isArray(files) ? files : [files];
	const config = {
		mime: {},
		browsers: ['ChromeHeadless'],
		frameworks: ['jasmine'],
		client: {
			jasmine: {
				random: true,
				seed: '4321',
				stopOnFailure: true,
				failFast: true
			}
		},
		files: patterns
	};
	//endregion
	//region Webpack
	if ((typeof webpack === 'object') && (webpack !== null)){
		// https://github.com/karma-runner/karma-chrome-launcher/issues/176#issuecomment-381642145
		config.mime['text/x-typescript'] = ['ts', 'tsx'];

		const webpackCopy = Object.assign({}, webpack);
		delete webpackCopy.entry;
		delete webpackCopy.optimization;
		config.webpack = webpackCopy;
		config.webpackMiddleware = {
			logLevel: 'silent'
		};

		const preprocessors = {};
		for (const pattern of patterns){
			preprocessors[pattern] = ['webpack', 'sourcemap'];
		}
		config.preprocessors = preprocessors;
	}
	//endregion
	return config;
}

module.exports = getConfig;
