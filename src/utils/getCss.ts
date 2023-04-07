export const getCss = (el: Element, prop: string) => {
  return window.getComputedStyle(el).getPropertyValue(prop);
};
