import { PluginComponentParams } from '@/enum';
import { Radio } from 'components/radio';
import { Scalable } from 'components/scalable';
import config from 'config';
import React from 'react';
import { Selectors } from 'state/redux/selectors';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { IGoogleCloudVoice } from 'state/redux/state';

export const Component = ({ state, actions, id }: PluginComponentParams) => {
  const plugin = new Selectors(state).getPlugin(id);
  const voices = new Selectors(state).getTextToSpeechVoices();
  const activeVoice = new Selectors(state).getActiveTextToSpeechVoice();
  // console.log()
  console.log(state);
  console.log(voices);
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
      {voices.length > 0 && (
        <>
          <InputLabel id='demo-simple-select-helper-label'>Voice</InputLabel>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={activeVoice?.name}
            onChange={(e: any) => {
              console.log(`changing select dropdown`);
              console.log(e);
            }}
          >
            {voices.map((voice: IGoogleCloudVoice) => (
              <MenuItem value={voice.name}>{voice.name}</MenuItem>
            ))}
          </Select>
        </>
      )}
      {plugin.scaling && (
        <Scalable plugin={plugin} actions={actions} scaling={plugin.scaling} />
      )}
    </div>
  );
};

export default Component;
