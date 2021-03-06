import Utility from '@/utility';

export enum ValueManipulationType {
  PercentageScaling,
  AbsoluteScaling,
  Toggle,
  Direct
}

export enum DOMValueType {
  Attribute = 'attribute',
  Style = 'style',
  Property = 'property'
}

export interface IPluginActionOptions {
  // Name of property (e.g. 'font-size')
  name?: string;
  // Method of scaling property value
  manipulationType?: ValueManipulationType;
  // Value applied for Direct manipulation type when enabled.
  enabledValue?: any;
  // Value applied for Direct manipulation type when disabled.
  disabledValue?: any;
  // Base value if no original value can be determined
  baseValue?: any;
  // Unit type to be used for property (e.g. 'px', 'em', etc)
  unitType?: string;
}

export interface IPluginAction {
  cacheNodes?: boolean;
  data?: any;
  disable: () => void;
  enable: (value: any | void) => void;
  id?: string;
  name?: string;
  initialize?: (self: any) => void;
  query?: string;
}

export interface IPluginActionParams {
  cacheNodes?: boolean;
  data?: any;
  disable?: () => void;
  enable?: (value: any | void) => void;
  id?: string;
  name?: string;
  initialize?: (self: any) => void;
  query?: string;
}

/**
 * Executes actions issued from parent PluginElements.
 * PluginActions have no concept of state, so actions should be self-contained (functional).
 */
export abstract class PluginAction implements IPluginAction {
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
  public cacheNodes: boolean = true;
  public data: any;
  public id: string = Utility.generateGuid();
  public name: string = '';
  public query: string = 'body';
  private _nodeList?: NodeList;

  protected constructor(params?: IPluginActionParams) {
    if (params) {
      if (params.id) {
        this.id = params.id;
      }
      if (params.data) {
        this.data = params.data;
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
      if (params.initialize) {
        this.initialize = params.initialize;
      }
    }
  }

  public initialize: (self: any) => void = () => undefined;

  public abstract enable(value: any | void): void;

  public abstract disable(): void;
}
