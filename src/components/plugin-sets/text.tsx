import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';
import InnerExpansionPanel from 'components/inner-expansion-panel';
// Plugins
import EmphasizeHoverComponent from 'plugins/emphasize-hover';
import EmphasizeHoverPlugin from 'plugins/emphasize-hover/plugin';
import EmphasizeTitlesComponent from 'plugins/emphasize-titles';
import EmphasizeTitlesPlugin from 'plugins/emphasize-titles/plugin';
import FontSizeComponent from 'plugins/font-size';
import FontSizePlugin from 'plugins/font-size/plugin';
import LetterSpacingComponent from 'plugins/letter-spacing';
import LetterSpacingPlugin from 'plugins/letter-spacing/plugin';
import ReadableFontsComponent from 'plugins/readable-fonts';
import ReadableFontsPlugin from 'plugins/readable-fonts/plugin';

import React from 'react';
import { Connector } from 'state/redux/connectors';
import { State } from 'state/redux/state';

const TextPluginSet = ({
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
    title={'Text Options'}
    theme={theme}
  >
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <FontSizeComponent
          state={state}
          actions={actions}
          id={FontSizePlugin.id}
          toggleDisabled={true}
        />
      </Grid>
      <Grid item xs={6}>
        <LetterSpacingComponent
          state={state}
          actions={actions}
          id={LetterSpacingPlugin.id}
          toggleDisabled={true}
        />
      </Grid>
      <Grid item xs={6}>
        <EmphasizeHoverComponent
          state={state}
          actions={actions}
          id={EmphasizeHoverPlugin.id}
        />
      </Grid>
      <Grid item xs={6}>
        <EmphasizeTitlesComponent
          state={state}
          actions={actions}
          id={EmphasizeTitlesPlugin.id}
        />
      </Grid>
      <Grid item xs={12}>
        <ReadableFontsComponent
          state={state}
          actions={actions}
          id={ReadableFontsPlugin.id}
          toggleDisabled={true}
        />
      </Grid>
    </Grid>
  </InnerExpansionPanel>
);

export default TextPluginSet;
