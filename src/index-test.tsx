// import { reducerInitializedStore } from '@/state';
import { PluginItem, PluginList } from 'components/base-plugin';
import config from 'config';
import { createReducerFunction } from 'immer-reducer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { PluginReducer } from 'state/redux/actions';
import { defaultState } from 'state/redux/state';
import { createPluginStore } from 'state/redux/store';
import styles from 'styles/global.scss';

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
    <PluginList
      plugins={[
        defaultState.plugins['font-size'],
        defaultState.plugins['text-spacing'],
        defaultState.plugins['keyboard-navigation'],
        defaultState.plugins['text-to-speech']
      ]}
    />
    {/*<BasePlugin*/}
    {/*  key={defaultState.plugins['test'].id}*/}
    {/*  data={defaultState.plugins['test']}*/}
    {/*/>*/}
    <PluginItem
      key={defaultState.plugins['test'].id}
      plugin={defaultState.plugins['test']}
    />
  </Provider>,
  modal
);
