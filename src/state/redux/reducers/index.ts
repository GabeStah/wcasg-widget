import Utility from '@/utility';
import { IGoogleCloudVoice } from 'services/google-cloud/text-to-speech/declarations';
import { ImmerReducer } from 'immer-reducer';
import findIndex from 'lodash/findIndex';
import { defaultState, State } from 'state/redux/state';

const getPluginIndexById = (plugins: any, id: any) => {
  return findIndex(plugins, (plugin: any) => plugin.id === id);
};

export class BaseReducer extends ImmerReducer<State> {
  public decrement(payload: { id: string }) {
    const i = getPluginIndexById(this.draftState.plugins, payload.id);
    const scaling = this.draftState.plugins[i].scaling;
    if (scaling) {
      scaling.factor = scaling.factor
        ? scaling.factor - scaling.increment
        : scaling.baseFactor - scaling.increment;
    }
  }

  public disable(payload: { id: string }) {
    const i = getPluginIndexById(this.draftState.plugins, payload.id);
    this.draftState.plugins[i].enabled = false;
  }

  public disableKeyboard() {
    this.draftState.keyboard.enabled = false;
  }

  public enable(payload: { id: string }) {
    const i = getPluginIndexById(this.draftState.plugins, payload.id);
    this.draftState.plugins[i].enabled = true;
  }

  public enableKeyboard() {
    this.draftState.keyboard.enabled = true;
  }

  public focusNode(payload: { node: any }) {
    this.draftState.focusedNode = payload.node;
  }

  public increment(payload: { id: string }) {
    const i = getPluginIndexById(this.draftState.plugins, payload.id);
    const scaling = this.draftState.plugins[i].scaling;
    if (scaling) {
      scaling.factor = scaling.factor
        ? scaling.factor + scaling.increment
        : scaling.baseFactor + scaling.increment;
    }
  }

  public keyDown(payload: { key: string }) {
    this.draftState.keyboard.pressedKeys[payload.key] = true;
  }

  public keyUp(payload: { key: string }) {
    this.draftState.keyboard.pressedKeys[payload.key] = false;
  }

  public reset(payload: { newState?: State }) {
    this.draftState = payload.newState ? payload.newState : defaultState;
  }

  public selectOption(payload: { id: string; selectId: number }) {
    const i = getPluginIndexById(this.draftState.plugins, payload.id);
    const plugin = this.draftState.plugins[i];
    if (plugin && plugin.options) {
      // Reset all
      for (const option of plugin.options) {
        option.selected = false;
      }
      plugin.options[payload.selectId].selected = true;
    }
  }

  public setActiveTextToSpeechVoice(voice: IGoogleCloudVoice) {
    // Convert between IGoogleCloudVoice and IGoogleCloudVoiceSelectionParams
    this.draftState.services.googleCloud.textToSpeech.activeVoice = {
      languageCode: voice.languageCodes[0],
      name: voice.name,
      ssmlGender: voice.ssmlGender
    };
  }

  public setTextToSpeechVoices(voices: IGoogleCloudVoice[]) {
    this.draftState.services.googleCloud.textToSpeech.voices = voices;
  }
}
