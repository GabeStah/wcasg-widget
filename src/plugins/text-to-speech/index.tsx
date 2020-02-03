import { PluginComponentParams } from '@/enum';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { IGoogleCloudVoice } from 'services/google-cloud/text-to-speech/declarations';
import { Radio } from 'components/radio';
import { Scalable } from 'components/scalable';
import config from 'config';
import React, { ChangeEvent, useEffect } from 'react';
import { Selectors } from 'state/redux/selectors';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import styles from './styles.scss';

export const Component = ({ state, actions, id }: PluginComponentParams) => {
  const plugin = new Selectors(state).getPlugin(id);
  const voices = new Selectors(state).getTextToSpeechVoices();
  const activeVoice = new Selectors(state).getActiveTextToSpeechVoice();
  const audioConfig = new Selectors(state).getTextToSpeechAudioConfig();

  const handleVoiceChange = (event: React.ChangeEvent<{ value: any }>) => {
    const voice = new Selectors(state).getTextToSpeechVoice(event.target.value);
    if (voice) {
      actions.setActiveTextToSpeechVoice(voice);
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
    <div>
      <h2>{plugin.title}</h2>
      <button
        onClick={() => {
          if (plugin.enabled) {
            actions.disable(plugin.id);
          } else {
            actions.enable(plugin.id);
          }
        }}
        aria-label={`${plugin.enabled ? 'Disable' : 'Enable'} ${plugin.title}`}
        aria-roledescription={'button'}
        role={'button'}
      >
        {plugin.enabled ? 'Disable' : 'Enable'}
      </button>
      {plugin.options.length > 0 && (
        <Radio data={plugin.options} plugin={plugin} actions={actions} />
      )}
      {voices && voices.length > 0 && (
        <>
          <InputLabel id='demo-simple-select-helper-label'>Voice</InputLabel>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={activeVoice?.name}
            onChange={handleVoiceChange}
          >
            {voices.map((voice: IGoogleCloudVoice) => (
              <MenuItem value={voice.name}>{voice.name}</MenuItem>
            ))}
          </Select>
        </>
      )}
      <Typography id={'pitch-slider'} gutterBottom>
        Pitch
      </Typography>
      <Slider
        value={audioConfig.pitch}
        defaultValue={audioConfig.pitch}
        valueLabelDisplay='auto'
        step={1}
        marks
        min={-20}
        max={20}
        onChange={handlePitchChange}
        className={styles.slider}
      />
      <Typography id={'rate-slider'} gutterBottom>
        Rate
      </Typography>
      <Slider
        value={audioConfig.speakingRate}
        defaultValue={audioConfig.speakingRate}
        valueLabelDisplay='auto'
        step={0.25}
        marks
        min={0.25}
        max={4}
        onChange={handleRateChange}
        className={styles.slider}
      />
      <Typography id={'volume-slider'} gutterBottom>
        Volume
      </Typography>
      <Slider
        value={audioConfig.volumeGainDb}
        defaultValue={audioConfig.volumeGainDb}
        valueLabelDisplay='auto'
        step={1}
        marks
        min={-96}
        max={16}
        onChange={handleVolumeChange}
        className={styles.slider}
      />
      {plugin.scaling && (
        <Scalable plugin={plugin} actions={actions} scaling={plugin.scaling} />
      )}
    </div>
  );
};

export default Component;
