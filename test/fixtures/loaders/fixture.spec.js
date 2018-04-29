/* eslint-env node, jasmine */
'use strict';
const example1 = require('./1.example');
const example2 = require('./2.example');

describe('Suite', () => {
	it('First', () => {
		expect(example1).toEqual({hello: 111});
	});
	it('Second', () => {
		expect(example2).toEqual({world: 222});
	});
});
