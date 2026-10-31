# decimal (ProFit fork)

A maintained fork of [`decimal@0.0.2`](https://www.npmjs.com/package/decimal) by Samori Gorse
([shinuza/decimal-js](https://github.com/shinuza/decimal-js), MIT). The npm package is marked "no longer
supported" and the upstream repository is archived; its `master` branch was later rewritten (ES module,
string-only arguments, different zero handling), which is **not** what this fork carries.

This branch (`profit`) keeps the published 0.0.2 arithmetic exactly — `lib/decimal.js` is byte for byte
the file npm shipped — and only modernizes the packaging:

- `engines` raised from `node 0.4.x` to `>=22` (tested on Node.js 22, 24, and 26)
- the original test suites run under `node --test`, plus a fixture matrix of 3,600+ results recorded from
  the published 0.0.2 so any change to the arithmetic fails loudly

## Install

```bash
npm install github:m-s-morgan/decimal-js#v0.0.3
```

## Use

```js
const Decimal = require('decimal');

Decimal('1.1').add('2.2').toString(); // '3.3'
Decimal.mul(19.99, 0.029).toNumber(); // 0.57971
```

Methods: `add`, `sub`, `mul`, `div` (instance and static), `toString`, `toNumber`.

## Test

```bash
npm test
```
