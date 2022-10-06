
import { CodoTimestampFrom, CodoTimestamp } from './time.js';
import { CodoPrecision, CodoCtxOptions, CodoContext } from './context.js';
import { Codokey } from './key.js';

export function codoctx(options?: CodoCtxOptions) {
  return CodoContext.from(options);
}

export function codokey(
  timestamp?: CodoTimestamp | CodoTimestampFrom | null,
  context?: CodoContext | CodoCtxOptions | null,
  precision?: CodoPrecision
) {
  return Codokey.from(timestamp, context, precision).toString();
}

export function parseCodokey(key: string, options?: CodoCtxOptions) {
  return Codokey.parse(key, options);
}
