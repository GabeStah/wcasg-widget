export interface Plugin {
  id: string;
  title: string;
  enabled: boolean;
  scalingFactor?: number;
}

export interface State {
  plugins: {
    [id: string]: Plugin;
  };
}

export const Plugins = {
  'text-spacing': {
    title: 'text-spacing',
    id: 'text-spacing',
    enabled: true,
    scalingFactor: 0
  },
  'font-size': {
    title: 'font size',
    id: 'font-size',
    enabled: false,
    scalingFactor: 5
  },
  'keyboard-navigation': {
    title: 'Keyboard Navigation',
    id: 'keyboard-navigation',
    enabled: false
  },
  'text-to-speech': {
    title: 'Text to Speech',
    id: 'text-to-speech',
    enabled: false
  },
  test: {
    id: 'test',
    title: 'Test',
    enabled: false,
    scalingFactor: 5
  }
};

export const defaultState: State = {
  plugins: Plugins
};

/**
 * Some state selection helpers. Using helper like makes it easier to refactor
 * the the state structure when required. This selector helper can be used in
 * both the render prop connect and the Immer Reducer.
 */
export class PluginSelectors {
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

  public getPlugin(id: string) {
    const plugin = this.state.plugins[id];
    if (!plugin) {
      throw new Error(`Plugin with id [${id}] does not exist.`);
    }
    return plugin;
  }
}
