import Utility from '@/utility';
import { IGoogleCloudVoice } from 'services/google-cloud/text-to-speech/declarations';
import { ImmerReducer } from 'immer-reducer';
import findIndex from 'lodash/findIndex';
import { defaultState, State } from 'state/redux/state';

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
    this.draftState = newState ? newState : defaultState;
  }

  public selectOption({ id, selectId }: { id: string; selectId: number }) {
    const i = getPluginIndexById(this.draftState.plugins, id);
    const plugin = this.draftState.plugins[i];
    if (plugin && plugin.options) {
      // Reset all
      for (const option of plugin.options) {
        option.selected = false;
      }
      plugin.options[selectId].selected = true;
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
}
