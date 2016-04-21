// log.ts

/*
 * Middleware for logging of HTTP requests and responses
 */

/*
 The MIT License

 Copyright (c) 2014-2016 Carl Ansley

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

import * as winston from 'winston';
import {Context} from 'koa';

let winstonLogger = new (winston.Logger)({transports: [new (winston.transports.Console)({'timestamp': true})]});
winston.level = 'debug';

export let logger = async function (context: Context, next: Function) {
  let startTime = Date.now();
  let { method, url } = context.request;

  await next();

  let logHttp: any = {
    method: method,
    url: url,
    status: context.status
  };

  logHttp.time = (Date.now() - startTime) + 'ms';

  winstonLogger.info('HTTP', logHttp);
};

export default winstonLogger;