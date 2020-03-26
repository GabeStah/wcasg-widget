import { PluginComponentParams, SelectOption } from '@/enum';
import { createStyles, Theme } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { PluginComponent } from 'components/plugin';
import SelectComponent from 'components/select';
import RadioComponent from 'components/radio';
import React, { ChangeEvent } from 'react';
import {
  IGoogleCloudVoice,
  IGoogleCloudVoiceSelectionParams
} from 'services/google-cloud/text-to-speech/declarations';
import { Selectors } from 'state/redux/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      minWidth: '200px',
      width: '100%'
    },
    startIcon: {
      fill: theme.palette.text.secondary,
      padding: '4px'
    }
  })
);

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
}

export const Component = ({
  state,
  actions,
  id,
  theme
}: PluginComponentParams) => {
  const styles = useStyles(theme);

  const plugin = new Selectors(state).getPlugin(id);
  const options = new Selectors(state).getPluginOptions({
    pluginId: plugin.id
  });
  const voices = new Selectors(state).getTextToSpeechVoices();
  const activeVoice = new Selectors(state).getActiveTextToSpeechVoice();
  const audioConfig = new Selectors(state).getTextToSpeechAudioConfig();

  if (options && plugin.enabled) {
    const selected = options.find(option => option.selected);
    if (selected) {
      // let styleName = styles.highlightLinksBoth;
      // switch (selected.value) {
      //   case 'all':
      //     styleName = styles.highlightLinksBlock;
      //     break;
      //   case 'links':
      //     styleName = styles.highlightLinksBorder;
      //     break;
      //   default:
      //     styleName = styles.highlightLinksBoth;
      //     break;
      // }
      //
      // Css.addClass({
      //   node: body,
      //   name: styleName
      // });
    }
  }

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

  const handleBehaviorChange = (event: React.ChangeEvent<{ value: any }>) => {
    const value = event.target.value;
    if (Array.isArray(value)) {
      actions.setTextToSpeechSpeakingRate(value[0]);
    } else {
      actions.setTextToSpeechSpeakingRate(value);
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
            name={'Select Voice'}
            onChangeHandler={handleVoiceChange}
            autoToggle={true}
            state={state}
            plugin={plugin}
            options={selectOptions(voices, activeVoice)}
            actions={actions}
          />
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
      />
      <RadioComponent
        actions={actions}
        plugin={plugin}
        data={[
          {
            id: 0,
            name: 'behavior',
            text: 'All',
            value: 'all'
          },
          {
            id: 1,
            name: 'behavior',
            text: 'Links Only',
            value: 'links'
          }
        ]}
        state={state}
        title={'Behavior'}
      />
      <RadioComponent
        plugin={plugin}
        data={options}
        actions={actions}
        theme={theme}
      />
    </PluginComponent>
  );
};

export default Component;
