
import { CodoTimestampFrom, CodoTimestamp } from './time.js';
import { Codokey } from './key.js';

export enum CodoPrecision {
  YEAR,
  MONTH,
  DAY,
  HOUR,
  MINUTE,
  SECOND,
  SPLIT
}

export interface CodoCtxOptions {
  sinceYear?: number;
  untilYear?: number;
  untilSplit?: number;
  precision?: CodoPrecision;
}

export interface CodoContextJSON {
  sinceYear: number;
  untilYear: number;
  untilSplit: number;
  precision: CodoPrecision;
}

export class CodoContext implements CodoContextJSON {
  static defaultSinceYear = 1970;
  static defaultUntilYear = CodoContext.defaultSinceYear + parseInt('zz', 36);
  static defaultUntilSplit = 9;
  static defaultPrecision = CodoPrecision.DAY;

  static from(options?: CodoCtxOptions) {
    return new CodoContext(options);
  }

  sinceYear: number;
  untilYear: number;
  untilSplit: number;
  precision: CodoPrecision;

  constructor(
    {
      sinceYear,
      untilYear,
      untilSplit,
      precision
    }: CodoCtxOptions = {}
  ) {
    this.sinceYear = sinceYear ?? CodoContext.defaultSinceYear;
    this.untilYear = untilYear ?? CodoContext.defaultUntilYear;
    this.untilSplit = untilSplit ?? CodoContext.defaultUntilSplit;
    this.precision = precision ?? CodoContext.defaultPrecision;
  }

  key(
    timestamp?: CodoTimestamp | CodoTimestampFrom | null,
    precision?: CodoPrecision
  ) {
    return new Codokey(timestamp, this, precision);
  }

  toJSON(): CodoContextJSON {
    return {
      sinceYear: this.sinceYear,
      untilYear: this.untilYear,
      untilSplit: this.untilSplit,
      precision: this.precision
    };
  }
}
