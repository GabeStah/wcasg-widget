import { PluginComponentParams, SelectOption } from '@/enum';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { PluginComponent } from 'components/plugin';
import SelectComponent from 'components/select';
import React, { ChangeEvent } from 'react';
import {
  IGoogleCloudVoice,
  IGoogleCloudVoiceSelectionParams
} from 'services/google-cloud/text-to-speech/declarations';
import { Selectors } from 'state/redux/selectors';

function selectOptions(
  voices: IGoogleCloudVoice[],
  selectedVoice: IGoogleCloudVoiceSelectionParams
): SelectOption[] {
  return voices.map((voice: IGoogleCloudVoice, key: number) => {
    return {
      value: voice.name,
      text: voice.name,
      id: key,
      selected: selectedVoice.name === voice.name
    };
  });
  // const elements = document.querySelectorAll(
  //   allTags.map((tag: string) => 'body '.concat(tag)).join(', ')
  // );
  // const options: SelectOption[] = [];
  // // const options: any[] = [];
  // // Iterate nodes
  // elements.forEach((element: any) => {
  //   // Get ARIA text of element
  //   const text = Aria.getElementText({ element }).trim();
  //   // If header
  //   if (headerTags.includes(element.tagName)) {
  //     options.push({
  //       isGroup: true,
  //       text,
  //       value: element.href
  //     });
  //   } else {
  //     options.push({
  //       isGroup: false,
  //       text,
  //       value: element.href
  //     });
  //   }
  // });
  // return options;
}

export const Component = ({
  state,
  actions,
  id,
  theme
}: PluginComponentParams) => {
  const plugin = new Selectors(state).getPlugin(id);
  const voices = new Selectors(state).getTextToSpeechVoices();
  const activeVoice = new Selectors(state).getActiveTextToSpeechVoice();
  const audioConfig = new Selectors(state).getTextToSpeechAudioConfig();

  const handleVoiceChange = (event: React.ChangeEvent<{ value: any }>) => {
    const enabled = plugin.enabled;
    if (event.target.value === undefined || event.target.value === '') {
      if (enabled) {
        actions.disable(plugin.id);
      }
    } else {
      const voice = new Selectors(state).getTextToSpeechVoice(
        event.target.value
      );
      if (voice) {
        actions.setActiveTextToSpeechVoice(voice);
        // Enable if needed
        if (!enabled) {
          actions.enable(plugin.id);
        }
      }
    }
  };

  const handleRateChange = (
    event: ChangeEvent<{}>,
    value: number | number[]
  ) => {
    if (Array.isArray(value)) {
      actions.setTextToSpeechSpeakingRate(value[0]);
    } else {
      actions.setTextToSpeechSpeakingRate(value);
    }
  };

  const handleVolumeChange = (
    event: ChangeEvent<{}>,
    value: number | number[]
  ) => {
    if (Array.isArray(value)) {
      actions.setTextToSpeechVolumeGainDb(value[0]);
    } else {
      actions.setTextToSpeechVolumeGainDb(value);
    }
  };

  const handlePitchChange = (
    event: ChangeEvent<{}>,
    value: number | number[]
  ) => {
    if (Array.isArray(value)) {
      actions.setTextToSpeechPitch(value[0]);
    } else {
      actions.setTextToSpeechPitch(value);
    }
  };

  return (
    <PluginComponent
      actions={actions}
      state={state}
      id={id}
      toggleDisabled={true}
      theme={theme}
    >
      {voices && voices.length > 0 && (
        <>
          <SelectComponent
            // id={`${plugin.id}-voice`}
            // labelId={`${plugin.id}-voice-label`}
            // value={activeVoice?.name}
            name={'Select Voice'}
            onChangeHandler={handleVoiceChange}
            autoToggle={true}
            state={state}
            plugin={plugin}
            options={selectOptions(voices, activeVoice)}
            actions={actions}
          />
        </>
        // <>
        //   <InputLabel id={`${plugin.id}-voice-label`}>Voice</InputLabel>
        //   <Select
        //     id={`${plugin.id}-voice`}
        //     labelId={`${plugin.id}-voice-label`}
        //     value={activeVoice?.name}
        //     onChange={handleVoiceChange}
        //     native={true}
        //   >
        //     {voices.map((voice: IGoogleCloudVoice) => (
        //       <MenuItem value={voice.name}>{voice.name}</MenuItem>
        //     ))}
        //   </Select>
        // </>
      )}
      <Typography id={`${plugin.id}-pitch-label`} gutterBottom>
        Pitch
      </Typography>
      <Slider
        id={`${plugin.id}-pitch`}
        value={audioConfig.pitch}
        defaultValue={audioConfig.pitch}
        valueLabelDisplay='auto'
        step={1}
        marks
        min={-20}
        max={20}
        onChange={handlePitchChange}
        // className={styles.slider}
      />
      <Typography id={`${plugin.id}-rate-label`} gutterBottom>
        Rate
      </Typography>
      <Slider
        id={`${plugin.id}-rate`}
        value={audioConfig.speakingRate}
        defaultValue={audioConfig.speakingRate}
        valueLabelDisplay='auto'
        step={0.25}
        marks
        min={0.25}
        max={4}
        onChange={handleRateChange}
        // className={styles.slider}
      />
      <Typography id={`${plugin.id}-volume-label`} gutterBottom>
        Volume
      </Typography>
      <Slider
        id={`${plugin.id}-volume`}
        value={audioConfig.volumeGainDb}
        defaultValue={audioConfig.volumeGainDb}
        valueLabelDisplay='auto'
        step={1}
        marks
        min={-96}
        max={16}
        onChange={handleVolumeChange}
        // className={styles.slider}
      />
    </PluginComponent>
  );
};

export default Component;
