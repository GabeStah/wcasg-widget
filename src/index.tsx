import { ThemeProvider } from '@material-ui/core/styles';

import DetailedExpansionPanel from 'components/detailed-expansion-panel';
import config from 'config';
import LZString from 'lz-string';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Connector } from 'state/redux/connectors';
import { Selectors } from 'state/redux/selectors';
import { State } from 'state/redux/state';
import { createPluginStore } from 'state/redux/store';
import { ThemeTypes } from 'theme/types';
import themeBase from 'theme/base';
import themeBlackAndYellow from 'theme/black-and-yellow';
import themeDarkContrast from 'theme/dark-contrast';
import themeLightContrast from 'theme/light-contrast';
import './load-plugins';
// @ts-ignore
import Extensions from 'wcasg-extensions';
// @ts-ignore
import WcasgExtensions from 'WcasgExtensions';

if (config.debug) {
  console.warn('--- DEBUG ENABLED ---');
}

const extensionJson = LZString.decompressFromBase64(WcasgExtensions);
if (extensionJson) {
  const importedExtensions = JSON.parse(extensionJson);
  console.log(importedExtensions);
  // Add imports and purge existing.
  Extensions.manager.addImports(importedExtensions, true);
  Extensions.manager.processBuiltInImports();
  Extensions.manager.processCustomImports();
  Extensions.manager.executeExtensions();
}

// Create modal div to contain widget and append to html doc
const app = document.createElement(`div`);
app.setAttribute('id', config.widgetId);
app.setAttribute('class', config.widgetId);

document.getElementsByTagName('html')[0].append(app);

ReactDOM.render(
  <Provider store={createPluginStore()}>
    <Connector>
      {(state: State, actions: typeof Connector.__actions) => {
        let theme;
        const currentTheme = new Selectors(state).getTheme();

        switch (currentTheme) {
          case ThemeTypes.Base:
            theme = themeBase;
            break;
          case ThemeTypes.BlackAndYellow:
            theme = themeBlackAndYellow;
            break;
          case ThemeTypes.DarkContrast:
            theme = themeDarkContrast;
            break;
          case ThemeTypes.LightContrast:
            theme = themeLightContrast;
            break;
          default:
            theme = themeBase;
        }

        return (
          <ThemeProvider theme={theme}>
            <DetailedExpansionPanel
              state={state}
              actions={actions}
              theme={theme}
            />
          </ThemeProvider>
        );
      }}
    </Connector>
  </Provider>,
  app
);
