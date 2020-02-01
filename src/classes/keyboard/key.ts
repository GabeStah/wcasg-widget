import { Key as NonPrintableKey } from '@/declaration';
import Dom from '@/utility/dom';

interface IKey {
  action?: any;
  displayedValue?: string;
  insertValued?: string;
  size?: number | KeyboardLayoutKeySize;
  type: string | NonPrintableKey;
}

export enum KeyboardLayoutKeySize {
  Normal,
  Large,
  XLarge,
  XXLarge
}

export enum KeyboardLanguage {
  enUS = 'en-US'
}

interface IKeyParams {
  action?: any;
  displayedValue?: string;
  insertedValue?: string;
  size?: number | KeyboardLayoutKeySize;
  type: string | NonPrintableKey;
}

export class Key implements IKey {
  public action?: any;
  public insertValued?: string;
  public size: number | KeyboardLayoutKeySize = KeyboardLayoutKeySize.Normal;
  public type: string | NonPrintableKey;
  private readonly _displayedValue?: string;

  constructor({
    displayedValue,
    size,
    type,
    action,
    insertedValue
  }: IKeyParams) {
    this.action = action ? action : undefined;
    this._displayedValue = displayedValue ? displayedValue : undefined;
    this.size = size ? size : this.size;
    this.type = type;
    this.insertValued = insertedValue ? insertedValue : this.insertValued;
  }
  public toString(): string {
    return this._displayedValue ? this._displayedValue : this.type.toString();
  }
}

/**
 * enum key type
 * displayed string
 * on press action
 */

export interface IKeyboardLayout {
  rows: Key[][];
  lang: KeyboardLanguage;
}

export const KeyboardLayoutENUS: IKeyboardLayout = {
  lang: KeyboardLanguage.enUS,
  rows: [
    [
      new Key({ type: '`' }),
      new Key({ type: '1' }),
      new Key({ type: '2' }),
      new Key({ type: '3' }),
      new Key({ type: '4' }),
      new Key({ type: '5' }),
      new Key({ type: '6' }),
      new Key({ type: '7' }),
      new Key({ type: '8' }),
      new Key({ type: '9' }),
      new Key({ type: '0' }),
      new Key({ type: '-' }),
      new Key({ type: '=' }),
      new Key({
        action: Dom.simulateBackspaceInInputElement,
        displayedValue: '⌫',
        size: KeyboardLayoutKeySize.Large,
        type: NonPrintableKey.Backspace
      }),
      new Key({
        action: Dom.simulateDeleteInInputElement,
        displayedValue: 'DEL',
        type: NonPrintableKey.Delete
      })
    ],
    [
      new Key({
        displayedValue: 'TAB',
        insertedValue: '\t',
        size: KeyboardLayoutKeySize.Large,
        type: NonPrintableKey.Tab
      }),
      new Key({ type: 'q' }),
      new Key({ type: 'w' }),
      new Key({ type: 'e' }),
      new Key({ type: 'r' }),
      new Key({ type: 't' }),
      new Key({ type: 'y' }),
      new Key({ type: 'u' }),
      new Key({ type: 'i' }),
      new Key({ type: 'o' }),
      new Key({ type: 'p' }),
      new Key({ type: '[' }),
      new Key({ type: ']' }),
      new Key({ size: KeyboardLayoutKeySize.Large, type: '\\' })
    ],
    [
      new Key({
        displayedValue: 'CAPSLOCK',
        size: KeyboardLayoutKeySize.Large,
        type: NonPrintableKey.CapsLock
      }),
      new Key({ type: 'a' }),
      new Key({ type: 's' }),
      new Key({ type: 'd' }),
      new Key({ type: 'f' }),
      new Key({ type: 'g' }),
      new Key({ type: 'h' }),
      new Key({ type: 'j' }),
      new Key({ type: 'k' }),
      new Key({ type: 'l' }),
      new Key({ type: ';' }),
      // tslint:disable-next-line:quotemark
      new Key({ type: "'" }),
      new Key({
        displayedValue: 'ENTER',
        insertedValue: '\n',
        size: KeyboardLayoutKeySize.Large,
        type: NonPrintableKey.Enter
      })
    ],
    [
      new Key({
        displayedValue: 'SHIFT',
        size: KeyboardLayoutKeySize.Large,
        type: NonPrintableKey.Shift
      }),
      new Key({ type: 'z' }),
      new Key({ type: 'x' }),
      new Key({ type: 'c' }),
      new Key({ type: 'v' }),
      new Key({ type: 'b' }),
      new Key({ type: 'n' }),
      new Key({ type: 'm' }),
      new Key({ type: ',' }),
      new Key({ type: '.' }),
      new Key({ type: '/' }),
      new Key({
        displayedValue: 'SHIFT',
        size: KeyboardLayoutKeySize.Large,
        type: NonPrintableKey.Shift
      })
    ],
    [
      new Key({
        displayedValue: 'CTRL',
        size: KeyboardLayoutKeySize.Large,
        type: NonPrintableKey.Control
      }),
      new Key({ displayedValue: 'ALT', type: NonPrintableKey.Alt }),
      new Key({
        displayedValue: 'SPACE',
        insertedValue: ' ',
        size: KeyboardLayoutKeySize.XXLarge,
        type: ' '
      }),
      new Key({ displayedValue: 'ALT', type: NonPrintableKey.Alt }),
      new Key({
        displayedValue: 'CTRL',
        size: KeyboardLayoutKeySize.Large,
        type: NonPrintableKey.Control
      })
    ]
  ]
};
