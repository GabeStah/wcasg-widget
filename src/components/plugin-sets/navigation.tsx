import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';
import InnerExpansionPanel from 'components/inner-expansion-panel';
// Plugins
import HighlightLinksComponent from 'plugins/highlight-links';
import HighlightLinksPlugin from 'plugins/highlight-links/plugin';
import TooltipComponent from 'plugins/tooltip';
import TooltipPlugin from 'plugins/tooltip/plugin';
import VirtualKeyboardComponent from 'plugins/virtual-keyboard';
import VirtualKeyboardPlugin from 'plugins/virtual-keyboard/plugin';
import KeyboardNavigationComponent from 'plugins/keyboard-navigation';
import KeyboardNavigationPlugin from 'plugins/keyboard-navigation/plugin';
import PageNavigationComponent from 'plugins/page-navigation';
import PageNavigationPlugin from 'plugins/page-navigation/plugin';
import TextToSpeechComponent from 'plugins/text-to-speech';
import TextToSpeechPlugin from 'plugins/text-to-speech/plugin';

import React from 'react';
import { Connector } from 'state/redux/connectors';
import { State } from 'state/redux/state';

const NavigationPluginSet = ({
  state,
  actions,
  theme
}: {
  theme: Theme;
  state: State;
  actions: typeof Connector.__actions;
}) => (
  <InnerExpansionPanel
    state={state}
    actions={actions}
    title={'Navigation Options'}
    theme={theme}
  >
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <HighlightLinksComponent
          state={state}
          actions={actions}
          id={HighlightLinksPlugin.id}
          toggleDisabled={true}
          theme={theme}
        />
      </Grid>
      <Grid item xs={6}>
        <TooltipComponent
          state={state}
          actions={actions}
          id={TooltipPlugin.id}
          theme={theme}
        />
      </Grid>
      <Grid item xs={6}>
        <VirtualKeyboardComponent
          state={state}
          actions={actions}
          id={VirtualKeyboardPlugin.id}
          theme={theme}
        />
      </Grid>
      <Grid item xs={6}>
        <KeyboardNavigationComponent
          state={state}
          actions={actions}
          id={KeyboardNavigationPlugin.id}
          theme={theme}
        />
      </Grid>
      <Grid item xs={12}>
        <PageNavigationComponent
          state={state}
          actions={actions}
          id={PageNavigationPlugin.id}
          theme={theme}
        />
      </Grid>
      <Grid item xs={12}>
        <TextToSpeechComponent
          state={state}
          actions={actions}
          id={TextToSpeechPlugin.id}
          theme={theme}
        />
      </Grid>
    </Grid>
  </InnerExpansionPanel>
);

export default NavigationPluginSet;
