import { IGoogleCloudVoice } from 'services/google-cloud/text-to-speech/declarations';
import { defaultState, State } from 'state/redux/state';
import { createConnector } from 'state/redux/store';

export const Connector = createConnector({
  mapState: selectors => selectors.state,

  mapActions: (actions, props) => ({
    decrement(id: string) {
      actions.decrement({ id });
    },
    disable(id: string) {
      actions.disable({ id });
    },
    disableKeyboard() {
      actions.disableKeyboard();
    },
    enable(id: string) {
      actions.enable({ id });
    },
    enableKeyboard() {
      actions.enableKeyboard();
    },
    focusNode(node: any) {
      actions.focusNode({ node });
    },
    increment(id: string) {
      actions.increment({ id });
    },
    keyDown(key: string) {
      actions.keyDown({ key });
    },
    keyUp(key: string) {
      actions.keyUp({ key });
    },
    reset(newState?: State) {
      actions.reset({ newState });
    },

    selectOption(id: string, value: number | string | undefined) {
      actions.selectOption({ id, value });
    },

    setActiveTextToSpeechVoice(voice: IGoogleCloudVoice) {
      actions.setActiveTextToSpeechVoice({ voice });
    },

    setTextToSpeechPitch(value: number) {
      actions.setTextToSpeechPitch({ value });
    },

    setTextToSpeechSpeakingRate(value: number) {
      actions.setTextToSpeechSpeakingRate({ value });
    },

    setTextToSpeechVolumeGainDb(value: number) {
      actions.setTextToSpeechVolumeGainDb({ value });
    },

    setTextToSpeechVoices(voices: IGoogleCloudVoice[]) {
      actions.setTextToSpeechVoices({ voices });
    },

    setWidgetExpanded(value: boolean) {
      actions.setWidgetIsExpanded({ value });
    }
  })
});
