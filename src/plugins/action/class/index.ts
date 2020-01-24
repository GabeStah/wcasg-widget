import Utility from '@/utility';
import { IPluginAction, PluginAction } from 'plugins/action';

interface IPluginActionClass extends IPluginAction {
  cacheNodes: boolean;
  klass: string | string[];
  query: string;
}

interface IPluginActionClassParams {
  cacheNodes?: boolean;
  klass?: string | string[];
  id?: string;
  query?: string;
}

/**
 * PluginAction that adds / removes CSS classes from Nodes.
 */
export class PluginActionClass extends PluginAction
  implements IPluginActionClass {
  public cacheNodes: boolean = true;
  public klass: string | string[] = [];
  public query: string = 'body';
  private _nodeList?: NodeList;

  constructor(params?: IPluginActionClassParams) {
    super(params);
    if (params) {
      if (params.cacheNodes !== undefined) {
        this.cacheNodes = params.cacheNodes;
      }

      if (params.klass) {
        this.klass = params.klass;
      }

      if (params.query) {
        this.query = params.query;
      }
    }
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
