export const isUndefined = (value: any): value is undefined =>
  value === undefined;

export const isNull = (value: any): value is null => value === null;

export const isNil = (value: any) => isUndefined(value) || isNull(value);

export const isObject = (value: any): value is object =>
  value instanceof Object;

export const isNumber = (value: any): value is number =>
  typeof value === "number";
