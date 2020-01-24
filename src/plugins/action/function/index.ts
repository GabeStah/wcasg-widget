import Utility from '@/utility';
import { IPluginAction, PluginAction } from 'plugins/action';

type FunctionType = (params?: any) => any;

interface IPluginActionFunction extends IPluginAction {
  cacheNodes: boolean;
  func: FunctionType | FunctionType[];
  query: string;
}

interface IPluginActionFunctionParams {
  cacheNodes?: boolean;
  func?: FunctionType | FunctionType[];
  id?: string;
  query?: string;
}

/**
 * PluginAction that executes arbitrary functions.
 */
export class PluginActionFunction extends PluginAction
  implements IPluginActionFunction {
  public cacheNodes: boolean = true;
  public func: FunctionType | FunctionType[] = [];
  public query: string = 'body';
  private _nodeList!: NodeListOf<Element> | NodeList;

  constructor(params?: IPluginActionFunctionParams) {
    super(params);
    if (params) {
      if (params.cacheNodes !== undefined) {
        this.cacheNodes = params.cacheNodes;
      }

      if (params.func) {
        this.func = params.func;
      }

      if (params.query) {
        this.query = params.query;
      }
    }
  }

  // /**
  //  * Add classes to nodes
  //  */
  // public addClasses(): void {
  //   Utility.addClass({ node: this.nodeList, func: this.func });
  // }
  //
  // /**
  //  * Remove classes from nodes
  //  */
  // public removeClasses(): void {
  //   Utility.removeClass({ node: this.nodeList, func: this.func });
  // }

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

  // tslint:disable-next-line:member-ordering
  public enable(): void {
    // Iterate functions
    if (Array.isArray(this.func)) {
      this.func.forEach(f => f());
    } else {
      this.func();
    }
    // this.addClasses();
  }

  // tslint:disable-next-line:member-ordering
  public disable(): void {
    // this.removeClasses();
  }

  /**
   * Remove all applied classes, then reapply classes if enabled.
   */
  // tslint:disable-next-line:member-ordering
  public reset(): void {
    // Remove
    // this.removeClasses();
    // this.addClasses();
  }
}
