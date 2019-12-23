/* eslint-env node */
"use strict";

module.exports = function(source) {
	this.cacheable();
	// eslint-disable-next-line prefer-template
	return "module.exports = " + source.replace(/EXAMPLE/gi, "");
};
