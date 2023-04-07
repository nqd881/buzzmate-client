export type AppliedStyle = Partial<CSSStyleDeclaration>;

export const applyStyle = (element: HTMLElement, style: AppliedStyle) => {
  for (let prop in style) {
    if (style?.[prop]) element.style[prop] = style[prop] as string;
  }
};
