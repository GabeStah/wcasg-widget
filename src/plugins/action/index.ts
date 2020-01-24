import Utility from '@/utility';

enum PluginActionType {
  Class,
  Style,
  Script,
  Property
}

export interface IPluginAction {
  cacheNodes?: boolean;
  disable: () => void;
  enable: (value: any | void) => void;
  id?: string;
  name?: string;
  query?: string;
}

export interface IPluginActionParams {
  cacheNodes?: boolean;
  disable?: () => void;
  enable?: (value: any | void) => void;
  id?: string;
  name?: string;
  query?: string;
}

/**
 * Executes actions issued from parent PluginElements.
 * PluginActions have no concept of state, so actions should be self-contained (functional).
 */
export abstract class PluginAction implements IPluginAction {
  public cacheNodes: boolean = true;
  public id: string = Utility.generateGuid();
  public name: string = '';
  public query: string = 'body';
  private _nodeList?: NodeList;

  protected constructor(params?: IPluginActionParams) {
    if (params) {
      if (params.id) {
        this.id = params.id;
      }
      if (params.name) {
        this.name = params.name;
      }
      if (params.enable) {
        this.enable = params.enable;
      }
      if (params.disable) {
        this.disable = params.disable;
      }

      if (params.cacheNodes !== undefined) {
        this.cacheNodes = params.cacheNodes;
      }

      if (params.query) {
        this.query = params.query;
      }
    }
  }

  /**
   * Retrieves NodeList of Elements based on query selection.
   * If `cacheNodes` is `true` then save initial query result to private property.
   * @returns {NodeList}
   */
  get nodeList(): NodeList {
    if (this.cacheNodes) {
      if (!this._nodeList) {
        this._nodeList = Utility.getNodeListFromQuery(this.query);
      }
      return this._nodeList;
    }
    return Utility.getNodeListFromQuery(this.query);
  }

  // tslint:disable-next-line:no-empty
  public abstract enable(value: any | void): void;

  // tslint:disable-next-line:no-empty
  public abstract disable(): void;
}
