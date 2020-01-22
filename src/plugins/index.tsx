import React from 'react';
import Utility from '@/utility';

export enum DOMManipulationType {
  BodyClass,
  NodeQuery
}

enum PluginActionType {
  Class,
  Style,
  Script
}

export interface IPluginAction {
  id?: string;
  disable: () => void;
  enable: () => void;
}

export class PluginAction implements IPluginAction {
  public id: string = Utility.generateGuid();
  constructor(params?: { id?: string }) {
    if (params) {
      if (params.id) {
        this.id = params.id;
      }
    }
  }

  // tslint:disable-next-line:no-empty
  public disable(): void {}
  // tslint:disable-next-line:no-empty
  public enable(): void {}
}

interface IPluginActionClass extends IPluginAction {
  klass: string | string[];
  node: NodeList | string | string[];
}

interface IPluginActionClassParams {
  klass?: string | string[];
  id?: string;
  node?: NodeList | string | string[];
}

export class PluginActionClass extends PluginAction
  implements IPluginActionClass {
  public klass: string | string[] = [];
  public node: NodeList | string | string[] = 'body';

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
   * Get applicable DOM node list based on passed nodes property.
   * @returns {any}
   */
  get nodeList(): any {
    if (this.node instanceof NodeList) {
      return this.node;
    } else {
      return document.querySelectorAll(
        Array.isArray(this.node) ? this.node.join(', ') : this.node
      );
    }
  }

  public enable(): void {
    // super.enable();
    this.addClasses();
  }

  public disable(): void {
    // super.disable();
    this.removeClasses();
  }

  /**
   * Remove all applied classes, then reapply classes if enabled.
   */
  public reset(): void {
    // Remove
    this.removeClasses();
    this.addClasses();
  }
}
