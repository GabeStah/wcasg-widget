import { PluginComponentParams } from '@/enum';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import RadioComponent from 'components/radio';
import Scalable from 'components/scalable';
import ToggleButton from 'components/toggle-button';
import React, { ChangeEvent } from 'react';
import { IGoogleCloudVoice } from 'services/google-cloud/text-to-speech/declarations';
import { Selectors } from 'state/redux/selectors';
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
      <Typography component={'h2'}>{plugin.title}</Typography>
      <ToggleButton plugin={plugin} actions={actions} />
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    if (plugin.enabled) {*/}
      {/*      actions.disable(plugin.id);*/}
      {/*    } else {*/}
      {/*      actions.enable(plugin.id);*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  aria-label={`${plugin.enabled ? 'Disable' : 'Enable'} ${plugin.title}`}*/}
      {/*  aria-roledescription={'button'}*/}
      {/*  role={'button'}*/}
      {/*>*/}
      {/*  {plugin.enabled ? 'Disable' : 'Enable'}*/}
      {/*</button>*/}
      {plugin.options.length > 0 && (
        <RadioComponent
          data={plugin.options}
          plugin={plugin}
          actions={actions}
        />
      )}
      {voices && voices.length > 0 && (
        <>
          <InputLabel id={`${plugin.id}-voice-label`}>Voice</InputLabel>
          <Select
            id={`${plugin.id}-voice`}
            labelId={`${plugin.id}-voice-label`}
            value={activeVoice?.name}
            onChange={handleVoiceChange}
          >
            {voices.map((voice: IGoogleCloudVoice) => (
              <MenuItem value={voice.name}>{voice.name}</MenuItem>
            ))}
          </Select>
        </>
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
        className={styles.slider}
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
        className={styles.slider}
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
        className={styles.slider}
      />
      {plugin.scaling && (
        <Scalable plugin={plugin} actions={actions} scaling={plugin.scaling} />
      )}
    </div>
  );
};

export default Component;
