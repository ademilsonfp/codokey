
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

  static decode(max: number, value: string) {
    return max - parseInt(value, 36);
  }

  static year(since: number, until: number, year: number) {
    return CodoField.calc(until - since, year - since);
  }

  static decodeYear(until: number, value: string) {
    return CodoField.decode(until, value);
  }

  static month(month: number) {
    return CodoField.calc(11, month);
  }

  static decodeMonth(value: string) {
    return CodoField.decode(11, value);
  }

  static untilDay(year: number, month: number) {
    return new Date(year, month + 1, 0).getUTCDate();
  }

  static day(year: number, month: number, day: number) {
    return CodoField.calc(CodoField.untilDay(year, month), day);
  }

  static decodeDay(year: number, month: number, value: string) {
    return CodoField.decode(CodoField.untilDay(year, month), value);
  }

  static hour(hour: number) {
    return CodoField.calc(23, hour);
  }

  static decodeHour(value: string) {
    return CodoField.decode(23, value);
  }

  static minute(minute: number) {
    return CodoField.calc(59, minute);
  }

  static decodeMinute(value: string) {
    return CodoField.decode(59, value);
  }

  static second(second: number) {
    return CodoField.minute(second);
  }

  static decodeSecond(value: string) {
    return CodoField.decodeMinute(value);
  }

  static split(until: number, split: number) {
    const e = CodoField.e10(until) - 2; // from millis

    return CodoField.calc(until, Math.floor(split * Math.pow(10, e)));
  }

  static decodeSplit(until: number, value: string) {
    const euntil = CodoField.e10(until);
    const e = 2 - euntil; // to millis
    const split = CodoField.decode(until, value) * Math.pow(10, e);
    const int = Math.floor(split);
    const pow10 = Math.pow(10, euntil);

    return int + Math.round((split - int) * pow10) / pow10;
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
