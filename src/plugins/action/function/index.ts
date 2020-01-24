import Utility from '@/utility';
import { IPluginAction, PluginAction } from 'plugins/action';

type FunctionType = (params?: any) => any;

interface IPluginActionFunction extends IPluginAction {
  func: FunctionType | FunctionType[];
  node: NodeList | string | string[];
}

interface IPluginActionFunctionParams {
  func?: FunctionType | FunctionType[];
  id?: string;
  node?: NodeList | string | string[];
}

/**
 * PluginAction that executes arbitrary functions.
 */
export class PluginActionFunction extends PluginAction
  implements IPluginActionFunction {
  public func: FunctionType | FunctionType[] = [];
  public node: NodeList | string | string[] = 'body';
  private _nodeList!: NodeListOf<Element> | NodeList;

  constructor(params?: IPluginActionFunctionParams) {
    super(params);
    if (params) {
      if (params.func) {
        this.func = params.func;
      }

      if (params.node) {
        this.node = params.node;
      }
    }

    // Assign nodes
    this.initializeNodeList();
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

  get nodeList(): any {
    return this._nodeList;
  }

  /**
   * Sets applicable DOM node list based on passed nodes property.
   * @returns {any}
   */
  private initializeNodeList(): any {
    if (this.node instanceof NodeList) {
      this._nodeList = this.node;
    } else {
      this._nodeList = document.querySelectorAll(
        Array.isArray(this.node) ? this.node.join(', ') : this.node
      );
    }
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
