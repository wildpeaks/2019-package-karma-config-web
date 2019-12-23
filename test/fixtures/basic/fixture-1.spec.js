/* eslint-env node, jasmine */
"use strict";

describe("Fixture 1", () => {
	it("Passes", () => {
		expect(typeof "hello").toBe("string");
	});
	it("Fails", () => {
		expect(typeof "hello").toBe("number");
	});
});
