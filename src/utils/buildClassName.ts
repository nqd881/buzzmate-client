import {isUndefined} from "lodash";
import {toArray} from "./toArray";

type Styles = {
  [key: string]: string;
};

type ClassName = string | undefined;

const filterClassName = (arrClassName: ClassName[]) =>
  arrClassName.filter((className) => !isUndefined(className)) as string[];

export const buildClassName = (className: ClassName | ClassName[]): string => {
  const arrClassName = toArray(className);
  return filterClassName(arrClassName).join(" ");
};

export const buildSassClassName = (
  styles: Styles,
  className: ClassName | ClassName[]
): string => {
  const arrClassName = toArray(className);
  return filterClassName(arrClassName)
    .map((className) => styles[className])
    .join(" ");
};

export const sassClasses =
  (styles: Styles) =>
  (
    className: ClassName | ClassName[],
    otherClasses?: ClassName | ClassName[]
  ): string =>
    buildClassName([
      buildSassClassName(styles, className),
      ...toArray(otherClasses ?? []),
    ]);
