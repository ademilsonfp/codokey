
import {
  CodoTimestampJSON,
  CodoTimestampFrom,
  CodoTimestamp
} from './time.js';

import {
  CodoPrecision,
  CodoCtxOptions,
  CodoContextJSON,
  CodoContext
} from './context.js';

import { CodoField } from './field.js';

export interface CodokeyJSON {
  timestamp: CodoTimestampJSON;
  context?: CodoContextJSON;
  precision?: CodoPrecision;
}

export class Codokey {
  static get defaultContext() {
    return new CodoContext();
  }

  static from(
    timestamp?: CodoTimestamp | CodoTimestampFrom | null,
    context?: CodoContext | CodoCtxOptions | null,
    precision?: CodoPrecision
  ) {
    return new Codokey(timestamp, context, precision);
  }

  static parse(key: string, context?: CodoContext | CodoCtxOptions) {
    context = (
      context instanceof CodoContext ? context : new CodoContext(context)
    );

    const { sinceYear, untilYear, untilSplit } = context as CodoContext;

    const fields = Array.from(
      CodoField.parse(sinceYear, untilYear, untilSplit, key)
    );

    const precision = fields.length - 1;
    const [year, month, day, hour, minute, second, split] = fields;

    const date = new Date(
      year,
      month ?? 0,
      day ?? 1,
      hour ?? 0,
      minute ?? 0,
      second ?? 0
    );

    const tzOffset = date.getTimezoneOffset();

    const timestamp = new CodoTimestamp(
      (date.getTime() - tzOffset * 60000) / 1000,
      split ?? 0
    );

    return new Codokey(timestamp, context, precision);
  }

  timestamp: CodoTimestamp;
  context: CodoContext;
  precision: CodoPrecision;

  constructor(
    timestamp?: CodoTimestamp | CodoTimestampFrom | null,
    context?: CodoContext | CodoCtxOptions | null,
    precision?: CodoPrecision
  ) {
    if (timestamp === undefined || timestamp === null) {
      timestamp = CodoTimestamp.now;
    }

    if (!(timestamp instanceof CodoTimestamp)) {
      timestamp = CodoTimestamp.from(timestamp);
    }

    if (!context) {
      context = Codokey.defaultContext;
    }

    if (!(context instanceof CodoContext)) {
      context = new CodoContext(context);
    }

    this.timestamp = timestamp as CodoTimestamp;
    this.context = context as CodoContext;
    this.precision = precision ?? this.context.precision;
  }

  get sharpenable() {
    return this.precision < CodoPrecision.SPLIT;
  }

  get sharpen() {
    return new Codokey(
      this.timestamp,
      this.context,
      Math.min(this.precision + 1, CodoPrecision.SPLIT)
    );
  }

  get fields() {
    const { precision } = this;
    const { date, split } = this.timestamp;
    const { sinceYear, untilYear, untilSplit } = this.context;
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();

    function* gen() {
      yield CodoField.year(sinceYear, untilYear, year);

      if (precision > CodoPrecision.YEAR) {
        yield CodoField.month(month);
      } else return;

      if (precision > CodoPrecision.MONTH) {
        yield CodoField.day(year, month, date.getUTCDate());
      } else return;

      if (precision > CodoPrecision.DAY) {
        yield CodoField.hour(date.getUTCHours())
      } else return;

      if (precision > CodoPrecision.HOUR) {
        yield CodoField.minute(date.getUTCMinutes())
      } else return;

      if (precision > CodoPrecision.MINUTE) {
        yield CodoField.second(date.getUTCSeconds())
      } else return;

      if (precision > CodoPrecision.SECOND) {
        yield CodoField.split(untilSplit, split);
      }
    }

    return gen();
  }

  toString() {
    return Array.from(this.fields).join('');
  }

  toJSON(ignoreDefaults = true) {
    const json: CodokeyJSON = { timestamp: this.timestamp };

    if (!ignoreDefaults || this.context !== Codokey.defaultContext) {
      json.context = this.context;
    }

    if (!ignoreDefaults || this.precision !== this.context.precision) {
      json.precision = this.precision;
    }

    return json;
  }
}
