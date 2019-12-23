/* eslint-env node, jasmine */
"use strict";
const getConfig = require("..");

/**
 * @param {String} title
 * @param {Object} webpack
 * @param {Boolean} expectThrows
 */
function testFixture(title, webpack, expectThrows) {
	it(title, () => {
		let actualThrows = false;
		try {
			getConfig({
				files: "fake.js",
				webpack
			});
		} catch (e) {
			actualThrows = true;
		}
		expect(actualThrows).toBe(expectThrows);
	});
}

testFixture("Valid: {}", {}, false);
testFixture("Valid: {hello: 123}", {hello: 123}, false);
testFixture('Invalid: "hello"', "hello", true);
testFixture("Invalid: []", [], true);
testFixture('Invalid: ["hello"]', ["hello"], true);
testFixture("Invalid: 123", 123, true);
testFixture("Invalid: NaN", NaN, true);
testFixture("Invalid: null", null, true);
testFixture("Invalid: false", false, true);
testFixture("Invalid: true", true, true);
testFixture("Invalid: RegExp", /hello/, true);
testFixture("Invalid: Promise", Promise.resolve(), true);
testFixture("Invalid: Symbol", Symbol("hello"), true);
