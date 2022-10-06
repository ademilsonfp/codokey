
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

  static from(timestamp: CodoTimestampFrom) {
    const isdate = timestamp instanceof Date;
    var split: number, value: number;

    if (isdate || typeof timestamp === 'number') {
      const t = isdate ? timestamp.getTime() : timestamp;

      value = Math.floor(t / 1000);
      split = t % 1000;
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
