import { State } from 'state/redux/state';
import { Plugin, PluginProperty, PluginPropertyOption } from '@/types';
import cloneDeep from 'lodash/cloneDeep';
import TypeGuard from '@/utility/type-guard.ts';

export interface GetPluginPropertyParams {
  plugin: Plugin | string;
  property: PluginProperty | string;
}

export interface GetPluginPropertyOptionParams {
  plugin: Plugin | string;
  property: PluginProperty | string;
  option: PluginPropertyOption | string;
}

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

  public getPlugin(id: string | Plugin) {
    if (TypeGuard.isPlugin(id)) {
      // Work only with string id so we can lookup fresh state.
      id = id.id;
    }
    const plugin = this.state.plugins[
      this.state.plugins.findIndex(p => p.id === id)
    ];
    if (!plugin) {
      throw new Error(`Plugin with id [${id}] does not exist.`);
    }
    return plugin;
  }

  public getPluginProperty({
    plugin,
    property
  }: GetPluginPropertyParams): PluginProperty | void {
    if (TypeGuard.isPluginProperty(property)) {
      property = property.id;
    }
    // Get plugin instance.
    plugin = this.getPlugin(plugin);
    return plugin.config?.props?.find(
      (prop: PluginProperty) => prop.id === property
    );
  }

  public getPluginProperties(id: string | Plugin): PluginProperty[] | void {
    const plugin = this.getPlugin(id);
    return plugin?.config?.props;
  }

  public getPluginPropertyOption({
    plugin,
    property,
    option
  }: GetPluginPropertyOptionParams): PluginPropertyOption | void {
    if (TypeGuard.isPluginPropertyOption(option)) {
      option = option.id;
    }
    // Get property instance.
    const existingProperty = this.getPluginProperty({ plugin, property });
    if (existingProperty) {
      return existingProperty.options?.find(
        (opt: PluginPropertyOption) => opt.id === option
      );
    }
  }

  public getPluginPropertyOptions({
    plugin,
    property
  }: GetPluginPropertyParams): PluginPropertyOption[] | void {
    const foundProperty = this.getPluginProperty({ plugin, property });
    if (foundProperty) {
      return foundProperty.options;
    }
  }

  public getPluginPropertySelectedOption({
    plugin,
    property
  }: GetPluginPropertyParams): PluginPropertyOption | void {
    const options = this.getPluginPropertyOptions({ plugin, property });
    if (options) {
      return options?.find((option: PluginPropertyOption) => option.selected);
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

  public getTheme() {
    return this.state.theme;
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
