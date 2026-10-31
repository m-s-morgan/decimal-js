'use strict';

const test = require('node:test');
const assert = require('node:assert');
const path = require('node:path');
const Decimal = require('..');

// the original 0.0.2 suites, unchanged apart from the path to lib/
for (const name of ['decimal_type', 'addition', 'subtraction', 'multiplication', 'division', 'chaining']) {
    test(`legacy ${name}`, () => {
        require(path.join(__dirname, 'legacy', `${name}.js`));
    });
}

// every result below was produced by the published decimal@0.0.2 (npm): the fork must keep its
// arithmetic byte for byte, quirks included ("00" for 0 + 0, NaN for 0 / 0)
test('matches decimal@0.0.2 for the fixture matrix', () => {
    const fixtures = require('./fixtures.json');

    for (const [a, op, b, expected] of fixtures) {
        let actual;

        if (op === 'toNumber') {
            actual = Decimal(a).toNumber();
            assert.ok(Object.is(actual, expected) || (Number.isNaN(actual) && expected === null), `Decimal(${a}).toNumber()`);
            continue;
        }

        try {
            actual = String(Decimal(a)[op](b));
        } catch (e) {
            actual = `THROWS:${e.constructor.name}`;
        }

        assert.strictEqual(actual, expected, `Decimal(${JSON.stringify(a)}).${op}(${JSON.stringify(b)})`);
    }
});

test('generics match the instance methods', () => {
    for (const op of ['add', 'sub', 'mul', 'div']) {
        assert.strictEqual(String(Decimal[op]('1001.0', '7.12')), String(Decimal('1001.0')[op]('7.12')));
    }
});

test('loads as CommonJS and works without new', () => {
    assert.strictEqual(typeof Decimal, 'function');
    assert.ok(Decimal(5) instanceof Decimal);
    assert.ok(new Decimal(5) instanceof Decimal);
});
