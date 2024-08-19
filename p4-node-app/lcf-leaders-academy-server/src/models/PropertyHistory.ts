/**
 * This will be used in the future to store the history of a property value.
 */

export enum SourceTypeEnum {
  WEB_UI,
  IMPORT,
  MOBILE_ANDROID,
  MOBILE_IOS,
}

interface LogEntry<T> {
  sourceID: string;
  sourceType: SourceTypeEnum;
  timestamp: Date;
  value: T;
  updatedBy?: string;
}

export default class PropertyHistory<T> {
  private history: LogEntry<T>[] = [];

  constructor(
    private readonly sourceID: string,
    private readonly sourceType: SourceTypeEnum,
    initialValue: T
  ) {
    this.history.push({
      sourceID: this.sourceID,
      sourceType: this.sourceType,
      timestamp: new Date(),
      value: initialValue,
    });
    this.currentValue = initialValue;
  }

  public get value(): T {
    return this.history[this.history.length - 1].value;
  }

  public set value(newValue: T) {
    this.history.push({
      sourceID: this.sourceID,
      sourceType: this.sourceType,
      timestamp: new Date(),
      value: newValue,
    });
    this.currentValue = newValue;
  }

  public setValue(newValue: T, updatedBy?: string) {
    this.history.push({
      sourceID: this.sourceID,
      sourceType: this.sourceType,
      timestamp: new Date(),
      value: newValue,
      updatedBy: updatedBy,
    });
    this.currentValue = newValue;
  }

  public getHistory(): LogEntry<T>[] {
    return this.history;
  }

  public currentValue: T;
}
