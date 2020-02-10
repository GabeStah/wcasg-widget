import { State } from 'state/redux/state';
import { Plugin, PluginLocalState, PluginOption } from '@/enum';
import cloneDeep from 'lodash/cloneDeep';

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

  public getEnabledIds(): string[] {
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

  public getPluginSelectedOption(id: string): any {
    const plugin = this.getPlugin(id);
    if (plugin && plugin.options) {
      for (const option of plugin.options) {
        if (option.selected) {
          return option;
        }
      }
    }
  }

  public getPluginScaling(id: string) {
    const plugin = this.getPlugin(id);
    if (plugin && plugin.scaling) {
      return plugin.scaling;
    }
  }

  public getPluginsLocalState() {
    return this.state.plugins.map((plugin: Plugin) => {
      const copy = cloneDeep(plugin);
      delete copy.tasks;
      return copy;
    });
  }

  public getActiveTextToSpeechVoice() {
    return this.state.services.googleCloud.textToSpeech.activeVoice;
  }

  public getTextToSpeechAudioConfig() {
    return this.state.services.googleCloud.textToSpeech.audioConfig;
  }

  public getTextToSpeechVoice(name: string) {
    const voice = this.state.services.googleCloud.textToSpeech.voices[
      this.state.services.googleCloud.textToSpeech.voices.findIndex(
        p => p.name === name
      )
    ];
    if (!voice) {
      throw new Error(`Voice with name [${name}] does not exist.`);
    }
    return voice;
  }

  public getTextToSpeechVoices() {
    return this.state.services.googleCloud.textToSpeech.voices;
  }

  public isKeyboardEnabled() {
    return this.state.keyboard.enabled;
  }

  public isKeyEnabled(key: string) {
    return this.state.keyboard.pressedKeys[key].enabled;
  }

  public isWidgetExpanded() {
    return this.state.isExpanded;
  }
}
