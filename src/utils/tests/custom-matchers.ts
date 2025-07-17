import { expect } from 'vitest';

expect.extend({
  toRoastOnFail(received, expected) {
    const pass = received === expected;
    const roastLines = [
      'Really? That’s what you’re going with?',
      'You missed it like it’s Monday morning.',
      'Expected more. Got disappointment.',
      'This test failed harder than your New Year’s resolution.',
    ];
    const roast = roastLines[Math.floor(Math.random() * roastLines.length)];

    return {
      pass,
      message: () =>
        pass
          ? 'Well done. The stars have aligned. 🎯'
          : `Uh-oh. ${roast}\nExpected: ${expected}\nReceived: ${received}`,
    };
  },
});
