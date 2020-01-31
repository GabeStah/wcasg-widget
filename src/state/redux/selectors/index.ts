import { State } from 'state/redux/state';

/**
 * Some state selection helpers. Using helper like makes it easier to refactor
 * the the state structure when required. This selector helper can be used in
 * both the render prop connect and the Immer Reducer.
 */
export class Selectors {
  public state: State;

  constructor(state: State) {
    this.state = state;
  }

  public getIds() {
    return Object.values(this.state.plugins).map(plugin => plugin.id);
  }

  public getEnabledIds() {
    return Object.values(this.state.plugins)
      .filter(plugin => plugin.enabled)
      .map(plugin => plugin.id);
  }

  public getEnabledKeys() {
    return Object.values(this.state.keyboard.pressedKeys).map(
      (key: any, index) => key[index].enabled
    );
  }

  public getKey(key: string) {
    return this.state.keyboard.pressedKeys[key];
  }

  public getFocusedNode() {
    return this.state.focusedNode;
  }

  public getPlugin(id: string) {
    const plugin = this.state.plugins[
      this.state.plugins.findIndex(p => p.id === id)
    ];
    if (!plugin) {
      throw new Error(`Plugin with id [${id}] does not exist.`);
    }
    return plugin;
  }

  public getPluginOption(id: string) {
    const plugin = this.getPlugin(id);
    if (plugin && plugin.options) {
      return plugin.options;
    }
  }

  public getPluginScaling(id: string) {
    const plugin = this.getPlugin(id);
    if (plugin && plugin.scaling) {
      return plugin.scaling;
    }
  }

  public isKeyboardEnabled() {
    return this.state.keyboard.enabled;
  }

  public isKeyEnabled(key: string) {
    return this.state.keyboard.pressedKeys[key].enabled;
  }
}
