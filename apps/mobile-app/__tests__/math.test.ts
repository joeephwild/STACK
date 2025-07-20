import { add, multiply, greet } from '../utils/math';

describe('Math Utilities', () => {
  describe('add function', () => {
    it('should add two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers correctly', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should add zero correctly', () => {
      expect(add(5, 0)).toBe(5);
      expect(add(0, 5)).toBe(5);
    });
  });

  describe('multiply function', () => {
    it('should multiply two positive numbers correctly', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it('should multiply by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    it('should multiply negative numbers', () => {
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
    });
  });

  describe('greet function', () => {
    it('should return a greeting message', () => {
      expect(greet('World')).toBe('Hello, World!');
    });

    it('should handle empty string', () => {
      expect(greet('')).toBe('Hello, !');
    });

    it('should handle special characters', () => {
      expect(greet('José')).toBe('Hello, José!');
    });
  });
});