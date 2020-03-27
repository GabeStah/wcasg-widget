import { Plugin, PluginProperty, PluginPropertyOption } from '@/types';
import { ImmerReducer } from 'immer-reducer';
import findIndex from 'lodash/findIndex';
import { IGoogleCloudVoice } from 'services/google-cloud/text-to-speech/declarations';
import { defaultState, initialState, State } from 'state/redux/state';
import { ThemeTypes } from 'theme/types';

const getPluginIndexById = (plugins: any, id: any) => {
  return findIndex(plugins, (plugin: any) => plugin.id === id);
};

export class BaseReducer extends ImmerReducer<State> {
  public decrement({ id }: { id: string }) {
    const i = getPluginIndexById(this.draftState.plugins, id);
    const scaling = this.draftState.plugins[i].scaling;
    if (scaling) {
      scaling.factor = scaling.factor
        ? scaling.factor - scaling.increment
        : scaling.baseFactor - scaling.increment;
    }
  }

  public disable({ id }: { id: string }) {
    const i = getPluginIndexById(this.draftState.plugins, id);
    this.draftState.plugins[i].enabled = false;
  }

  public disableKeyboard() {
    this.draftState.keyboard.enabled = false;
  }

  public enable({ id }: { id: string }) {
    const i = getPluginIndexById(this.draftState.plugins, id);
    this.draftState.plugins[i].enabled = true;
  }

  public enableKeyboard() {
    this.draftState.keyboard.enabled = true;
  }

  public focusNode(payload: { node: any }) {
    this.draftState.focusedNode = payload.node;
  }

  public increment({ id }: { id: string }) {
    const i = getPluginIndexById(this.draftState.plugins, id);
    const scaling = this.draftState.plugins[i].scaling;
    if (scaling) {
      scaling.factor = scaling.factor
        ? scaling.factor + scaling.increment
        : scaling.baseFactor + scaling.increment;
    }
  }

  public keyDown({ key }: { key: string }) {
    this.draftState.keyboard.pressedKeys[key] = true;
  }

  public keyUp({ key }: { key: string }) {
    this.draftState.keyboard.pressedKeys[key] = false;
  }

  public reset({ newState }: { newState?: State }) {
    if (newState === undefined) {
      const services = initialState.services;
      services.googleCloud.textToSpeech.voices = this.draftState.services.googleCloud.textToSpeech.voices;
      this.draftState = newState ? newState : { ...initialState, services };
    } else {
      this.draftState = newState ? newState : defaultState;
    }
  }

  public selectPropertyOption({
    id,
    propertyId,
    optionId
  }: {
    id: string;
    propertyId: string;
    optionId: string;
  }) {
    const i = getPluginIndexById(this.draftState.plugins, id);
    const plugin: Plugin = this.draftState.plugins[i];
    if (plugin?.config?.props) {
      const property = plugin.config.props.find(
        (prop: PluginProperty) => prop.id === propertyId
      );
      if (property && property.options) {
        // Disable selections
        for (const opt of property.options) {
          opt.selected = false;
        }
        const option = property.options.find(
          (opt: PluginPropertyOption) => opt.id === optionId
        );
        if (option) {
          option.selected = true;
        }
      }
    }
  }

  public setPropertyOption({
    id,
    propertyId,
    optionId,
    value
  }: {
    id: string;
    propertyId: string;
    optionId: string;
    value: any;
  }) {
    const i = getPluginIndexById(this.draftState.plugins, id);
    const plugin: Plugin = this.draftState.plugins[i];
    if (plugin?.config?.props) {
      const property = plugin.config.props.find(
        (prop: PluginProperty) => prop.id === propertyId
      );
      if (property && property.options) {
        const option = property.options.find(
          (opt: PluginPropertyOption) => opt.id === optionId
        );
        if (option) {
          option.value = value;
        }
      }
    }
  }

  public setActiveTextToSpeechVoice({ voice }: { voice: IGoogleCloudVoice }) {
    // Convert between IGoogleCloudVoice and IGoogleCloudVoiceSelectionParams
    this.draftState.services.googleCloud.textToSpeech.activeVoice = {
      languageCode: voice.languageCodes[0],
      name: voice.name,
      ssmlGender: voice.ssmlGender
    };
  }

  public setTextToSpeechPitch({ value }: { value: number }) {
    this.draftState.services.googleCloud.textToSpeech.audioConfig.pitch = value;
  }

  public setTextToSpeechSpeakingRate({ value }: { value: number }) {
    this.draftState.services.googleCloud.textToSpeech.audioConfig.speakingRate = value;
  }

  public setTextToSpeechVolumeGainDb({ value }: { value: number }) {
    this.draftState.services.googleCloud.textToSpeech.audioConfig.volumeGainDb = value;
  }

  public setTextToSpeechVoices({ voices }: { voices: IGoogleCloudVoice[] }) {
    this.draftState.services.googleCloud.textToSpeech.voices = voices;
  }

  public setTheme({ theme }: { theme: ThemeTypes }) {
    this.draftState.theme = theme;
  }

  public setWidgetIsExpanded({ value }: { value: boolean }) {
    this.draftState.isExpanded = value;
  }
}
