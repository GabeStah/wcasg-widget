// import { PluginComponent } from 'components/base-plugin';
import { Component as HighlightLinksComponent } from '@/plugins-new/highlight-links';
import { Component as KeyboardNavigationComponent } from '@/plugins-new/keyboard-navigation';
import { Component as TextToSpeechComponent } from '@/plugins-new/text-to-speech';
import { pluginHighlightLinks } from '@/plugins-new/highlight-links/plugin';
import { pluginKeyboardNavigation } from '@/plugins-new/keyboard-navigation/plugin';
import { pluginTextToSpeech } from '@/plugins-new/text-to-speech/plugin';
import { PluginComponent } from 'components/plugin';
// import { PluginList } from 'components/plugin-list';
import config from 'config';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Connector } from 'state/redux/connectors';
// import { KeyboardConnect } from 'state/redux/connectors/keyboard';
import { defaultState } from 'state/redux/state';
import { createPluginStore } from 'state/redux/store';
import styles from 'styles/global.scss';
// import { pluginHideImages } from 'plugins/hide-images';

// import Widget from 'components/widget';

// export const reducerFunction = createReducerFunction(
//   PluginReducer,
//   defaultState
// );
//
// const sagaMiddleware = createSagaMiddleware();
//
// export const store = createStore(
//   reducerFunction,
//   applyMiddleware(sagaMiddleware)
// );
//
// sagaMiddleware.run(watchImmerActions);

if (config.debug) {
  console.warn('--- DEBUG ENABLED ---');
  // document.querySelectorAll('a[class="btn btn-sm"]')[0].id = 'test';
}

// Create modal div to contain widget and append to html doc
const modal = document.createElement(`div`);
modal.setAttribute('id', config.widgetId);
modal.className = `${styles['wcasg-ada-app-container']}`;

document.getElementsByTagName('html')[0].append(modal);

ReactDOM.render(
  <Provider store={createPluginStore()}>
    <Connector>
      {(state, actions) => (
        <>
          <HighlightLinksComponent
            key={pluginHighlightLinks.id}
            state={state}
            actions={actions}
            id={pluginHighlightLinks.id}
          />
          <KeyboardNavigationComponent
            key={pluginKeyboardNavigation.id}
            state={state}
            actions={actions}
            id={pluginKeyboardNavigation.id}
          />
          <TextToSpeechComponent
            key={pluginTextToSpeech.id}
            state={state}
            actions={actions}
            id={pluginTextToSpeech.id}
          />
        </>
      )}
    </Connector>
  </Provider>,
  modal
);
