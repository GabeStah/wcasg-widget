import { IPlugin } from 'plugins/base/IPlugin';

/**
 * Singleton class that handles active Plugins across app.
 */
class PluginManager {
  public static instance: PluginManager;
  // tslint:disable-next-line:variable-name
  private readonly _plugins: IPlugin[] = [];

  constructor(params?: { plugins: IPlugin[] }) {
    if (!!PluginManager.instance) {
      return PluginManager.instance;
    }
    PluginManager.instance = this;

    if (params) {
      this._plugins = params.plugins;
    }

    return this;
  }

  public add(plugin: IPlugin | IPlugin[]) {
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

  public delete(plugin: string | IPlugin) {
    const index = this.findIndex(plugin);
    if (index === -1) {
      return;
    }
    delete this.plugins[index];
  }

  public exists(id: string | IPlugin): boolean {
    return !!this.find(id);
  }

  public find<T extends any>(id: string | IPlugin): any {
    if (typeof id !== 'string') {
      // Get underlying ID
      id = id.id;
    }
    return this.plugins[this.plugins.findIndex(plugin => plugin.id === id)];
  }

  public findIndex(id: string | IPlugin): number {
    if (typeof id !== 'string') {
      id = id.id;
    }
    return this.plugins.findIndex(plugin => plugin.id === id);
  }

  public get(id: string | IPlugin): IPlugin | void {
    return this.find(id);
  }

  get initialState() {
    return this.plugins.map<any>(plugin => plugin.initialState);
  }

  get plugins(): IPlugin[] {
    return this._plugins;
  }
}

export const pluginManagerInstance = new PluginManager();

export default pluginManagerInstance;
