import Utility from '@/utility';

enum PluginActionType {
  Class,
  Style,
  Script,
  Property
}

export interface IPluginAction {
  id?: string;
  disable: () => void;
  enable: (value: any | void) => void;
}

/**
 * Executes actions issued from parent PluginElements.
 * PluginActions have no concept of state, so actions should be self-contained (functional).
 */
export abstract class PluginAction implements IPluginAction {
  public id: string = Utility.generateGuid();

  protected constructor(params?: { id?: string }) {
    if (params) {
      if (params.id) {
        this.id = params.id;
      }
    }
  }

  // tslint:disable-next-line:no-empty
  public abstract enable(value: any | void): void;

  // tslint:disable-next-line:no-empty
  public abstract disable(): void;
}
