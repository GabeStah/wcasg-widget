import Utility from '@/utility';
import { IPluginAction, PluginAction } from 'plugins/action';

interface IPluginActionClass extends IPluginAction {
  klass: string | string[];
  node: NodeList | string | string[];
}

interface IPluginActionClassParams {
  klass?: string | string[];
  id?: string;
  node?: NodeList | string | string[];
}

/**
 * PluginAction that adds / removes CSS classes from Nodes.
 */
export class PluginActionClass extends PluginAction
  implements IPluginActionClass {
  public klass: string | string[] = [];
  public node: NodeList | string | string[] = 'body';
  private _nodeList!: NodeListOf<Element> | NodeList;

  constructor(params?: IPluginActionClassParams) {
    super(params);
    if (params) {
      if (params.klass) {
        this.klass = params.klass;
      }

      if (params.node) {
        this.node = params.node;
      }
    }

    // Assign nodes
    this.initializeNodeList();
  }

  /**
   * Add classes to nodes
   */
  public addClasses(): void {
    Utility.addClass({ node: this.nodeList, klass: this.klass });
  }

  /**
   * Remove classes from nodes
   */
  public removeClasses(): void {
    Utility.removeClass({ node: this.nodeList, klass: this.klass });
  }

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
