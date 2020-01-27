import {
  IPluginAction,
  IPluginActionParams,
  PluginAction
} from 'classes/plugin/action';

type FunctionType = (params?: any) => any;

export interface IPluginActionFunction extends IPluginAction {
  func: FunctionType | FunctionType[];
  funcOnDisable: FunctionType | FunctionType[];
}

interface IPluginActionFunctionParams extends IPluginActionParams {
  func?: FunctionType | FunctionType[];
  funcOnDisable?: FunctionType | FunctionType[];
}

/**
 * PluginAction that executes arbitrary functions.
 */
export class PluginActionFunction extends PluginAction
  implements IPluginActionFunction {
  public func: FunctionType | FunctionType[] = [];
  public funcOnDisable: FunctionType | FunctionType[] = [];

  constructor(params?: IPluginActionFunctionParams) {
    super(params);

    if (params) {
      if (params.func) {
        this.func = params.func;
      }
      if (params.funcOnDisable) {
        this.funcOnDisable = params.funcOnDisable;
      }
    }

    this.initialize(this);
  }

  public enable(): void {
    // Iterate functions
    if (Array.isArray(this.func)) {
      this.func.forEach(f => f(this));
    } else {
      this.func(this);
    }
  }

  public disable(): void {
    // Iterate functions
    if (Array.isArray(this.funcOnDisable)) {
      this.funcOnDisable.forEach(f => f(this));
    } else {
      this.funcOnDisable(this);
    }
  }
}
