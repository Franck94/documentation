/*eslint-disable no-unused-vars*/
const inferAugments = require('../../../src/infer/augments');
const parse = require('../../../src/parsers/javascript');

function toComment(fn, filename) {
  return parse(
    {
      file: filename,
      source: fn instanceof Function ? '(' + fn.toString() + ')' : fn
    },
    {}
  )[0];
}

function evaluate(code) {
  return inferAugments(toComment(code));
}

test('inferAugments', function() {
  expect(evaluate('/** */class A extends B {}').augments).toEqual([
    {
      name: 'B',
      title: 'augments'
    }
  ]);
});
