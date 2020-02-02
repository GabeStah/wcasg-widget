import { Plugin } from '@/enum';
import Store, { StorageDataType } from '@/utility/store';
import config from 'config';

/**
 * Singleton class that handles active Plugins across app.
 */
export default class PluginManager {
  get initialState() {
    return this.plugins;
  }

  get pluginsCustomized(): Plugin[] {
    return this.plugins.filter(plugin => plugin.customComponent);
  }

  get pluginsAutoGenerated(): Plugin[] {
    return this.plugins.filter(plugin => !plugin.customComponent);
  }

  get plugins(): Plugin[] {
    return this._plugins;
  }

  public static getInstance(): PluginManager {
    if (!PluginManager.instance) {
      PluginManager.instance = new PluginManager();
    }

    return PluginManager.instance;
  }
  private static instance: PluginManager;
  // tslint:disable-next-line:variable-name
  private readonly _plugins: Plugin[] = [];

  private constructor() {}

  public add(plugin: Plugin | Plugin[]) {
    if (Array.isArray(plugin)) {
      plugin.forEach(p => this.add(p));
    } else {
      if (this.exists(plugin.id)) {
        throw new Error(
          `Cannot add Plugin with ID: ${plugin.id} - Matching ID already exists.`
        );
      }
      this.plugins.push(plugin);
    }
  }

  public delete(plugin: string | Plugin) {
    const index = this.findIndex(plugin);
    if (index === -1) {
      return;
    }
    delete this.plugins[index];
  }

  public exists(id: string | Plugin): boolean {
    return !!this.find(id);
  }

  public find<T extends any>(id: string | Plugin): any {
    if (typeof id !== 'string') {
      // Get underlying ID
      id = id.id;
    }
    return this.plugins[this.plugins.findIndex(plugin => plugin.id === id)];
  }

  public findIndex(id: string | Plugin): number {
    if (typeof id !== 'string') {
      id = id.id;
    }
    return this.plugins.findIndex(plugin => plugin.id === id);
  }

  public get(id: string | Plugin): Plugin | void {
    return this.find(id);
  }

  public setPluginInstanceState(plugin: Plugin): void {
    if (!plugin || !plugin.id) {
      return;
    }
    const matchIndex = this.findIndex(plugin.id);
    if (matchIndex > -1) {
      // Marge base with overrides
      this.plugins[matchIndex] = { ...this.plugins[matchIndex], ...plugin };
    }
  }
}
