/* eslint-env node, jasmine */
'use strict';
const classes = require('./example.css');
const image = require('./example.jpg');

describe('Suite', () => {
	it('CSS', () => {
		expect(typeof classes).toBe('object');
		expect(typeof classes.hello).toBe('string');
	});
	it('JPEG', () => {
		expect(typeof image).toBe('string');
	});
});
