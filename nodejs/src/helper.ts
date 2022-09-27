
import { CodoCtxOptions, CodoContext, CodoOptions, Codokey } from './key.js';

export function codoctx(options?: CodoCtxOptions) {
  return CodoContext.from(options);
}

export function codokey(options?: CodoOptions) {
  return Codokey.from(options).toString();
}
