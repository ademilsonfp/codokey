
import tap from 'tap';

import {
  CodoPrecision,
  CodoContext,
  Codokey
} from '../src/key.js';

const TZ_OFFSET_MS = new Date().getTimezoneOffset() * 60000;

function getUtcTime(
  year: number,
  month: number,
  date: number,
  hour: number,
  minute: number,
  second: number,
  millisecond: number
): number {
  return new Date(
    year,
    month,
    date,
    hour,
    minute,
    second,
    millisecond
  ).getTime() - TZ_OFFSET_MS;
}

tap.test('Codokey', function (tap) {
  const SPECIFIC_CTX = Object.freeze(new CodoContext({
    untilSplit: 999,
    precision: CodoPrecision.SPLIT
  }));

  function* samples(): Generator<[string, number], void, unknown> {
    yield ['yj000000000', getUtcTime(2022, 11, 31, 23, 59, 59, 999)];
    yield ['yl9dk0c11op', getUtcTime(2020, 2, 18, 3, 47, 22, 110)];
    yield ['yo6rg0p0fls', getUtcTime(2017, 5, 3, 7, 34, 44, 215)];
    yield ['yr4cc111hiv', getUtcTime(2014, 7, 19, 11, 22, 6, 320)];
    yield ['yu1q81e0vfy', getUtcTime(2011, 10, 4, 16, 9, 28, 425)];
    yield ['ywbc50309d1', getUtcTime(2009, 0, 19, 19, 56, 50, 530)];
    yield ['yz8o10f1ba4', getUtcTime(2006, 3, 6, 22, 44, 12, 635)];
    yield ['z267l0s0p77', getUtcTime(2003, 5, 23, 2, 31, 34, 740)];
    yield ['z53nh15034a', getUtcTime(2000, 8, 7, 6, 18, 56, 845)];
    yield ['z817d1h151d', getUtcTime(1997, 10, 23, 11, 6, 18, 950)];
    yield ['zaaka060ich', getUtcTime(1995, 1, 8, 14, 53, 41, 55)];
    yield ['zd8560i1knb', getUtcTime(1992, 3, 25, 17, 41, 3, 160)];
    yield ['zg5k20v0yke', getUtcTime(1989, 6, 11, 21, 28, 25, 265)];
    yield ['zj33m180chh', getUtcTime(1986, 8, 27, 1, 15, 47, 370)];
    yield ['zm0ii1k1eek', getUtcTime(1983, 11, 13, 5, 3, 9, 475)];
    yield ['zoa1f090sbn', getUtcTime(1981, 1, 27, 8, 50, 31, 580)];
    yield ['zr7gb0m068q', getUtcTime(1978, 4, 15, 12, 37, 53, 685)];
    yield ['zu5070y185t', getUtcTime(1975, 6, 31, 16, 25, 15, 790)];
    yield ['zx2g31b0m2w', getUtcTime(1972, 9, 15, 20, 12, 37, 895)];
    yield ['zzbun1n1nrr', getUtcTime(1970, 0, 1, 0, 0, 0, 0)];
  };

  var expected: string, timestamp: number;
  var defaultKey: string, specificKey: string;

  for ([expected, timestamp] of samples()) {
    defaultKey = Codokey.from({ timestamp }).toString();
    specificKey = Codokey.from({ timestamp, context: SPECIFIC_CTX }).toString();

    tap.equal(specificKey, expected, `expected ${expected}`);

    if (!tap.equal(
      Codokey.parse(specificKey, SPECIFIC_CTX).timestamp.date.getTime(),
      timestamp,
      `expected ${timestamp}`
    )) {
      console.log('>', Codokey.parse(specificKey, SPECIFIC_CTX).timestamp.date, new Date(timestamp));
    };

    expected = expected.substring(0, 4);
    tap.equal(defaultKey, expected, `expected ${expected}`);

    timestamp = Math.floor(
      Math.floor(Math.floor(Math.floor(timestamp / 1000) / 60) / 60) / 24
    ) * 86400000;

    if (!tap.equal(
      Codokey.parse(defaultKey).timestamp.date.getTime(),
      timestamp,
      `expected ${timestamp}`
    )) {
      console.log('>', Codokey.parse(defaultKey).timestamp.date, new Date(timestamp));
    };
  }

  tap.end();
});
