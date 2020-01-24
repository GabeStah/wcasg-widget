import Utility from '@/utility';
import {
  IPluginAction,
  IPluginActionParams,
  PluginAction
} from 'plugins/action';

type FunctionType = (params?: any) => any;

interface IPluginActionFunction extends IPluginAction {
  func: FunctionType | FunctionType[];
}

interface IPluginActionFunctionParams extends IPluginActionParams {
  func?: FunctionType | FunctionType[];
}

/**
 * PluginAction that executes arbitrary functions.
 */
export class PluginActionFunction extends PluginAction
  implements IPluginActionFunction {
  public func: FunctionType | FunctionType[] = [];

  constructor(params?: IPluginActionFunctionParams) {
    super(params);
    if (params) {
      if (params.func) {
        this.func = params.func;
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
