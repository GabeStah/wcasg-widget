import { createReducerFunction } from 'immer-reducer';
import {
  applyMiddleware,
  bindActionCreators,
  compose,
  createStore,
  Reducer
} from 'redux';
import { makeConnector } from 'redux-render-prop';
import createSagaMiddleware from 'redux-saga';
import { BaseReducer } from 'state/redux/reducers';
import { Selectors } from 'state/redux/selectors';

import { ActionCreators } from './actions';
import { watchAll } from './sagas';
import { defaultState, State } from './state';

export const createConnector = makeConnector({
  prepareState: (state: State) => new Selectors(state),
  prepareActions: dispatch => bindActionCreators(ActionCreators, dispatch)
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
  }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

/**
 * Combine multiple reducers into a single one
 *
 * @param reducers two or more reducer
 */
function composeReducers<S>(...reducers: Reducer<S, any>[]): Reducer<any, any> {
  return (firstState: any, action: any) =>
    reducers.reduce((state, subReducer) => {
      if (typeof subReducer === 'function') {
        return subReducer(state, action);
      }

      return state;
    }, firstState) || firstState;
}

export function createPluginStore() {
  const reducer = composeReducers<State>(
    createReducerFunction(BaseReducer, defaultState)
  );
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(watchAll);

  return store;
}
