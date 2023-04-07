import {isNull, isUndefined} from "./checker";

export interface MousePosition {
  clientX: number;
  clientY: number;
}

export class Position {
  constructor(public x: number, public y: number) {}

  minus(b: Position) {
    return new Position(this.x - b.x, this.y - b.y);
  }

  plus(b: Position) {
    return new Position(this.x + b.x, this.y + b.y);
  }
}

// Viewport Position
export class VPP {
  private static viewportOrigin = new VPP(0, 0, null);

  _value: Position;
  _origin: VPP | null;

  constructor(x: number, y: number, origin?: HTMLElement | VPP | null) {
    this._value = new Position(x, y);
    this._origin = VPP.buildOrigin(origin);
  }

  get value() {
    return this._value;
  }

  get origin() {
    return this._origin;
  }

  static fromHTMLElement(element: HTMLElement) {
    const {x, y} = element.getBoundingClientRect();
    return new VPP(x, y);
  }

  static fromMouse<E extends MousePosition>(ev: E) {
    const {clientX, clientY} = ev;
    return new VPP(clientX, clientY);
  }

  private static buildOrigin(origin?: HTMLElement | VPP | null) {
    return isUndefined(origin) || isNull(origin)
      ? null
      : origin instanceof VPP
      ? origin
      : VPP.fromHTMLElement(origin);
  }

  getRelativeTo(root: VPP): Position {
    if (this._origin != root.origin) {
      const thisConvertedToSameOrigin = this.convertOrigin(root.origin);
      return thisConvertedToSameOrigin._value.minus(root.value);
    }

    return this._value.minus(root.value);
  }

  convertOrigin(newOrigin?: HTMLElement | VPP | null) {
    const oldOriginVPP = this._origin ?? VPP.viewportOrigin;
    const newOriginVPP = VPP.buildOrigin(newOrigin) ?? VPP.viewportOrigin;

    const oldOriginRelativeToNewOrigin =
      oldOriginVPP.getRelativeTo(newOriginVPP);
    const newValue = this._value.plus(oldOriginRelativeToNewOrigin);

    return new VPP(newValue.x, newValue.y, newOrigin);
  }
}
