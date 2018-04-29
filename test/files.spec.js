/* eslint-env node, jasmine */
'use strict';
const getConfig = require('..');


/**
 * @param {String} title
 * @param {String|String[]} files
 * @param {Boolean} expectThrows
 */
function testFixture(title, files, expectThrows){
	it(title, () => {
		let actualThrows = false;
		try {
			getConfig({files});
		} catch(e){
			actualThrows = true;
		}
		expect(actualThrows).toBe(expectThrows);
	});
}

testFixture('Valid: "hello"', 'hello', false);
testFixture('Valid: ["hello","world"]', ['hello', 'world'], false);
testFixture('Invalid: ""', '', true);
testFixture('Invalid: []', [], true);
testFixture('Invalid: ["hello",""]', ['hello', ''], true);
testFixture('Invalid: ["",""]', ['', ''], true);
testFixture('Invalid: {}', {}, true);
testFixture('Invalid: {hello: 123}', {hello: 123}, true);
testFixture('Invalid: 123', 123, true);
testFixture('Invalid: NaN', NaN, true);
testFixture('Invalid: null', null, true);
testFixture('Invalid: false', false, true);
testFixture('Invalid: true', true, true);
testFixture('Invalid: RegExp', /hello/, true);
testFixture('Invalid: Promise', Promise.resolve(), true);
testFixture('Invalid: Symbol', Symbol('hello'), true);
