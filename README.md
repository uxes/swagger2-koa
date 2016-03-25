[![Build Status](https://travis-ci.org/carlansley/swagger2-koa.svg?branch=master)](https://travis-ci.org/carlansley/swagger2-koa2)
[![Coverage Status](https://coveralls.io/repos/github/carlansley/swagger2-koa/badge.svg?branch=master)](https://coveralls.io/github/carlansley/swagger2-koa2?branch=master)
[![Dependencies](https://david-dm.org/carlansley/swagger2-koa2.svg)](https://raw.githubusercontent.com/carlansley/swagger2-koa2/master/package.json)

# swagger2-koa
Koa 2 middleware for loading, parsing and validating requests via swagger2.

## Installation

```shell
$ npm install swagger2-koa2 --save
```

## Usage

Basic loading and validation of swagger 2.0 document:

```
import * as swagger from 'swagger2';
import { validate } from 'swagger2-koa';

let app = new Koa();

// load YAML swagger file
const document = swagger.loadDocumentSync('./swagger.yml');

// validate document
if (!swagger.validateDocument(document)) {
  throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`);
}

app.use(body());
app.use(validate(document));

```

Serve swagger-ui for swagger 2.0 document:

```
import * as swagger from 'swagger2';
import { ui } from 'swagger2-koa';

let app = new Koa();

// load YAML swagger file
const document = swagger.loadDocumentSync('./swagger.yml');
app.use(ui(document));

```

`ui()` adds routes for /api-docs and serves swagger-ui at /.

## Limitations

* only supports Koa 2-style async/await middleware interface
* currently requires ES6 generators (via babel or natively in node 4+)

## License

MIT
