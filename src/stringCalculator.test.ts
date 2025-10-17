import { describe, it, expect } from 'vitest';
import { add } from './stringCalculator';

describe('string calculator', () => {
	it('returns 0 for empty string', () => {
		expect(add('')).toBe(0);
	});

	it('returns number for single number', () => {
		expect(add('5')).toBe(5);
	});

	it('adds two numbers comma separated', () => {
		expect(add('1,2')).toBe(3);
	});

	it('handles unknown amount of numbers', () => {
		expect(add('1,2,3,4')).toBe(10);
	});

	it('handles newlines as delimiters', () => {
		expect(add('1\n2,3')).toBe(6);
	});

	it('throws on negative numbers listing them', () => {
		expect(() => add('1,-2,3,-4')).toThrow('Negatives not allowed: -2,-4');
	});

	it('ignores numbers greater than 1000', () => {
		expect(add('2,1001')).toBe(2);
	});

	it('supports delimiters of any length', () => {
		expect(add('//[***]\n1***2***3')).toBe(6);
	});
});
