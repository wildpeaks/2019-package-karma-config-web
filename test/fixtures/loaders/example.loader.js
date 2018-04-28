/* eslint-env node */
'use strict';

module.exports = function(source){
	this.cacheable();
	return 'module.exports = ' + source.replace(/EXAMPLE/ig, ''); // eslint-disable-line prefer-template
};
