# Karma Config: Web

[![Greenkeeper badge](https://badges.greenkeeper.io/wildpeaks/package-karma-config-web.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/wildpeaks/package-karma-config-web.svg?branch=master)](https://travis-ci.org/wildpeaks/package-karma-config-web)

**Generates a Karma configuration** for testing using **Puppeteer**.


-------------------------------------------------------------------------------

## Quickstart

The `files` option specifies the test files to run:
````js
// karma.conf.js:
const getKarmaConfig = require('@wildpeaks/karma-config-web');

module.exports = function(config) {
	const karmaConfig = getKarmaConfig({
		files: 'src/**/*.spec.js'
	});
	config.set(karmaConfig);
};
````

You can also use several patterns:
````js
// karma.conf.js:
const getKarmaConfig = require('@wildpeaks/karma-config-web');

module.exports = function(config) {
	const karmaConfig = getKarmaConfig({
		files: [
			'test/*.test.js',
			'src/**/*.spec.js'
		]
	});
	config.set(karmaConfig);
};
````

Use a [Webpack 4 configuration](https://webpack.js.org/configuration/) to handle more filetypes:
````js
// karma.conf.js:
const getKarmaConfig = require('@wildpeaks/karma-config-web');

module.exports = function(config) {
	const karmaConfig = getKarmaConfig({
		files: 'src/**/*.spec.js',
		webpack: {
			module: {
				rules: [
					//...
				]
			}
			// ...
		}
	});
	config.set(karmaConfig);
};
````

The [Webpack Config Generator](https://www.npmjs.com/package/@wildpeaks/webpack-config-web) makes it easy
to support **Typescript, CSS, and images**:
````js
// karma.conf.js
const getKarmaConfig = require('@wildpeaks/karma-config-web');
const getWebpackConfig = require('@wildpeaks/webpack-config-web');

module.exports = function(config) {
	const webpackConfig = getWebpackConfig({
		mode: 'development',
		skipPostprocess: true
	});
	const karmaConfig = getKarmaConfig({
		files: 'src/**/*.spec.ts',
		webpack: webpackConfig
	});
	config.set(karmaConfig);
};
````


-------------------------------------------------------------------------------

## Additional browsers

The package only comes with **Puppeteer** (headless Chrome) because it's cross-platform
and headless (so you don't see the browser opening and closing when Karma runs the tests).

However, [Karma supports other browsers](http://karma-runner.github.io/2.0/config/browsers.html), such as:
 - [Firefox](https://www.npmjs.com/package/karma-firefox-launcher)
 - [Internet Explorer](https://www.npmjs.com/package/karma-ie-launcher)
 - [Edge](https://www.npmjs.com/package/karma-edge-launcher)
 - [Safari](https://www.npmjs.com/package/karma-safari-launcher)

You can also use paid services like [BrowserStack](https://www.npmjs.com/package/karma-browserstack-launcher)
and [Sauce Labs](https://www.npmjs.com/package/karma-saucelabs-launcher) to run tests
in *a lot* of desktop and mobile browsers.

Add additional launchers in the dependencies of your `package.json`, example:
````json
{
	"devDependencies": {
		"karma-edge-launcher": "...",
		"karma-firefox-launcher": "...",
		"karma-ie-launcher": "..."
	}
}
````
Then use property `browsers` in ` karma.conf.js`:

````js
const getKarmaConfig = require('@wildpeaks/karma-config-web');

module.exports = function(config) {
	const karmaConfig = getKarmaConfig({
		files: 'src/**/*.spec.ts'
	});
	karmaConfig.browsers = ['ChromeHeadless', 'Firefox', 'IE', 'Edge'];
	config.set(karmaConfig);
};
````

-------------------------------------------------------------------------------

