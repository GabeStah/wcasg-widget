import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';
import InnerExpansionPanel from 'components/inner-expansion-panel';
// Plugins
import MuteAudioComponent from 'plugins/mute-audio';
import MuteAudioPlugin from 'plugins/mute-audio/plugin';
import ContrastComponent from 'plugins/contrast';
import ContrastPlugin from 'plugins/contrast/plugin';
// import LightContrastComponent from 'plugins/light-contrast';
// import LightContrastPlugin from 'plugins/light-contrast/plugin';
import HighlightFormsComponent from 'plugins/highlight-forms';
import HighlightFormsPlugin from 'plugins/highlight-forms/plugin';
import LargeIconsComponent from 'plugins/large-icons';
import LargeIconsPlugin from 'plugins/large-icons/plugin';
import StopAnimationsComponent from 'plugins/stop-animations';
import StopAnimationsPlugin from 'plugins/stop-animations/plugin';
import LargeCursorComponent from 'plugins/large-cursor';
import LargeCursorPlugin from 'plugins/large-cursor/plugin';

import React from 'react';
import { Connector } from 'state/redux/connectors';
import { State } from 'state/redux/state';

const VisualPluginSet = ({
  state,
  actions,
  theme
}: {
  theme?: Theme;
  state: State;
  actions: typeof Connector.__actions;
}) => (
  <InnerExpansionPanel
    state={state}
    actions={actions}
    title={'Visual Options'}
    theme={theme}
  >
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <MuteAudioComponent
          state={state}
          actions={actions}
          id={MuteAudioPlugin.id}
        />
      </Grid>
      <Grid item xs={6}>
        <ContrastComponent
          state={state}
          actions={actions}
          toggleDisabled={true}
          id={ContrastPlugin.id}
        />
      </Grid>
      <Grid item xs={6}>
        <HighlightFormsComponent
          state={state}
          actions={actions}
          id={HighlightFormsPlugin.id}
        />
      </Grid>
      <Grid item xs={6}>
        <LargeIconsComponent
          state={state}
          actions={actions}
          id={LargeIconsPlugin.id}
        />
      </Grid>
      <Grid item xs={6}>
        <StopAnimationsComponent
          state={state}
          actions={actions}
          id={StopAnimationsPlugin.id}
        />
      </Grid>
      <Grid item xs={6}>
        <LargeCursorComponent
          state={state}
          actions={actions}
          id={LargeCursorPlugin.id}
        />
      </Grid>
    </Grid>
  </InnerExpansionPanel>
);

export default VisualPluginSet;
