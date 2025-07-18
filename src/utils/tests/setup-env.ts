import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(), // Legacy method
      removeListener: vi.fn(), // Legacy method
      addEventListener: vi.fn(), // Modern method
      removeEventListener: vi.fn(), // Modern method
      dispatchEvent: vi.fn(),
    };
  };

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

Object.defineProperty(global.SVGElement.prototype, 'getScreenCTM', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(global.SVGElement.prototype, 'getBBox', {
  writable: true,
  value: vi.fn().mockReturnValue({
    x: 0,
    y: 0,
  }),
});

Object.defineProperty(global.SVGElement.prototype, 'getComputedTextLength', {
  writable: true,
  value: vi.fn().mockReturnValue(220),
});

Object.defineProperty(global.SVGElement.prototype, 'transform', {
  writable: true,
  value: {
    baseVal: {
      consolidate: vi.fn(() => {}),
    },
  },
});

Object.defineProperty(global.SVGElement.prototype, 'createSVGMatrix', {
  writable: true,
  value: vi.fn().mockReturnValue({
    x: 10,
    y: 10,
    inverse: () => {},
    multiply: () => {},
  }),
});

window.HTMLElement.prototype.scrollIntoView = function () {};
