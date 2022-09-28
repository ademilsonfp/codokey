
export interface CodoTimestampJSON {
  value: number;
  split: number;
}

export type CodoTimestampFrom = number | Date | CodoTimestampJSON;

export class CodoTimestamp implements CodoTimestampJSON {
  static get now() {
    const originSplit = performance.timeOrigin % 1000;
    const elapsed = performance.now();
    const elapsedSplit = elapsed % 1000;
    const splitSum = originSplit + elapsedSplit;
    const split = splitSum % 1000;

    const value = (
      (performance.timeOrigin - originSplit) +
      (elapsed - elapsedSplit) +
      (splitSum - split)
    ) / 1000;

    return new CodoTimestamp(value, split);
  }

  static from(timestamp: CodoTimestampFrom, debug = false)  {
    const isdate = timestamp instanceof Date;
    var split: number, value: number;

    if (isdate || typeof timestamp === 'number') {
      const t = isdate ? timestamp.getTime() : timestamp;

      value = Math.floor(t / 1000);
      split = t % 1000;

      debug && console.log('.', t, value, split);
    } else {
      ({ value, split } = timestamp);
    }

    return new CodoTimestamp(value, split);
  }

  value: number;
  split: number;

  constructor(value: number, split: number) {
    this.value = value;
    this.split = split;
  }

  toJSON(): CodoTimestampJSON {
    return {
      value: this.value,
      split: this.split
    };
  }

  get time() {
    return this.value * 1000 + this.split;
  }

  get date() {
    return new Date(this.time);
  }
}

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

  key({ timestamp, precision }: Omit<CodoOptions, 'context'>) {
    const context = this;

    return new Codokey({ timestamp, context, precision });
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

export class CodoField {
  static len(max: number) {
    return max.toString(36).length;
  }

  static calc(max: number, value: number) {
    const pad = max.toString(36).replace(/./g, '0');
    const field = (max - value).toString(36);

    return pad.slice(0, -field.length) + field;
  }

  static e10(value: number) {
    return value === 0 ? value : Math.floor(Math.log10(value));
  }

  static year(since: number, until: number, year: number) {
    return CodoField.calc(until - since, year - since);
  }

  static month(month: number) {
    return CodoField.calc(11, month);
  }

  static untilDay(year: number, month: number) {
    return new Date(year, month + 1, 0).getUTCDate();
  }

  static day(year: number, month: number, day: number) {
    return CodoField.calc(CodoField.untilDay(year, month), day);
  }

  static hour(hour: number) {
    return CodoField.calc(23, hour);
  }

  static minute(minute: number) {
    return CodoField.calc(59, minute);
  }

  static second(second: number) {
    return CodoField.minute(second);
  }

  static split(until: number, split: number) {
    return CodoField.calc(
      until,
      (
        split > until
          ? (
            Math.floor(
              split * Math.pow(10, CodoField.e10(until) - CodoField.e10(split))
            )
          )
          : split
      )
    );
  }

  static decode(max: number, value: string) {
    return max - parseInt(value, 36);
  }

  static decodeYear(until: number, value: string) {
    return CodoField.decode(until, value);
  }

  static decodeMonth(value: string) {
    return CodoField.decode(11, value);
  }

  static decodeDay(year: number, month: number, value: string) {
    return CodoField.decode(CodoField.untilDay(year, month), value);
  }

  static decodeHour(value: string) {
    return CodoField.decode(23, value);
  }

  static decodeMinute(value: string) {
    return CodoField.decode(59, value);
  }

  static decodeSecond(value: string) {
    return CodoField.decodeMinute(value);
  }

  static decodeSplit(until: number, value: string) {
    const split = CodoField.decode(until, value);

    return split < 1000 ? split : split / 1000;
  }

  static* parse(
    sinceYear: number,
    untilYear: number,
    untilSplit: number,
    key: string
  ) {
    var offset = 0;

    function next(max: number, decode: (v: string) => number) {
      var value: number | null;

      if (offset === 0 || key.length > offset) {
        const length = CodoField.len(max);
        const code = key.slice(offset, offset += length);

        value = (
          code.length === length && /^[a-z0-9]+$/i.test(code)
          ? decode(code)
          : null
        );
      } else {
        value = null;
      }

      return value;
    }

    const decodeYear = CodoField.decodeYear.bind(null, untilYear);
    const year = next(untilYear - sinceYear, decodeYear);

    if (year !== null) {
      yield year;
    } else {
      throw new RangeError('Invalid codokey');
    }

    const month = next(11, CodoField.decodeMonth);

    if (month !== null) {
      yield month;
    } else return;

    const untilDay = CodoField.untilDay(year, month);
    const decodeDay = CodoField.decodeDay.bind(null, year, month);
    const day = next(untilDay, decodeDay);

    if (day !== null) {
      yield day;
    } else return;

    const hour = next(23, CodoField.decodeHour);

    if (hour !== null) {
      yield hour;
    } else return;

    const minute = next(59, CodoField.decodeMinute);

    if (minute !== null) {
      yield minute;
    } else return;

    const second = next(59, CodoField.decodeSecond);

    if (second !== null) {
      yield second;
    } else return;

    const decodeSplit = CodoField.decodeSplit.bind(null, untilSplit);
    const split = next(untilSplit, decodeSplit);

    if (split !== null) {
      yield split;
    }
  }
}

export interface CodoOptions {
  timestamp?: CodoTimestamp | CodoTimestampFrom,
  context?: CodoContext | CodoCtxOptions,
  precision?: CodoPrecision
}

export interface CodokeyJSON {
  timestamp: CodoTimestampJSON;
  context?: CodoContextJSON;
  precision?: CodoPrecision;
}

export class Codokey {
  static get defaultContext() {
    return new CodoContext();
  }

  static from(options?: CodoOptions) {
    return new Codokey(options);
  }

  static parse(key: string, options?: CodoCtxOptions) {
    const context = (
      options instanceof CodoContext ? options : new CodoContext(options)
    );

    const { sinceYear, untilYear, untilSplit } = context;

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

    return new Codokey({ timestamp, context, precision });
  }

  timestamp: CodoTimestamp;
  context: CodoContext;
  precision: CodoPrecision;

  constructor({ timestamp, context, precision }: CodoOptions = {}) {
    timestamp ??= CodoTimestamp.now;
    context ??= Codokey.defaultContext;

    if (!(timestamp instanceof CodoTimestamp)) {
      timestamp = CodoTimestamp.from(timestamp);
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
      {
        timestamp: this.timestamp,
        context: this.context,
        precision: Math.min(this.precision + 1, CodoPrecision.SPLIT)
      }
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
