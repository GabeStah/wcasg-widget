import Utility from '@/utility';
import {
  IPluginAction,
  IPluginActionParams,
  PluginAction
} from 'classes/plugin/action';

interface IPluginActionClass extends IPluginAction {
  klass: string | string[];
}

interface IPluginActionClassParams extends IPluginActionParams {
  klass?: string | string[];
}

/**
 * PluginAction that adds / removes CSS classes from Nodes.
 */
export class PluginActionClass extends PluginAction
  implements IPluginActionClass {
  public klass: string | string[] = [];

  constructor(params?: IPluginActionClassParams) {
    super(params);
    if (params) {
      if (params.klass) {
        this.klass = params.klass;
      }
    }
  }

  /**
   * Add classes to nodes
   */
  public addClasses(): void {
    Utility.Css.addClass({ node: this.nodeList, name: this.klass });
  }

  /**
   * Remove classes from nodes
   */
  public removeClasses(): void {
    Utility.Css.removeClass({ node: this.nodeList, name: this.klass });
  }

  // tslint:disable-next-line:member-ordering
  public enable(): void {
    this.addClasses();
  }

  // tslint:disable-next-line:member-ordering
  public disable(): void {
    this.removeClasses();
  }

  /**
   * Remove all applied classes, then reapply classes if enabled.
   */
  // tslint:disable-next-line:member-ordering
  public reset(): void {
    // Remove
    this.removeClasses();
    this.addClasses();
  }
}
