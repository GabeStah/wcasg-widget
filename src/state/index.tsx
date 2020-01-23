import React from 'react';
import { combineReducers, createStore } from 'redux';
import pluginStyles from 'styles/plugin-styles.scss';
import { PluginActionClass } from 'plugins/action/class';
import { PluginElementToggleable } from 'plugins/element/toggleable/';
import { PluginElementScalable } from 'plugins/element/scalable';
import {
  DOMPropertyScalingType,
  PluginActionProperty
} from 'plugins/action/property';
import TextNodeType from 'classes/node-types/TextNodeType';
// require('svg-url-loader!../../src/assets/cursor.svg');

export const elementReducers = (
  state: InitialStateType = initialState,
  action: IReducerActionParams
) => {
  if (action.type.includes('@@redux')) {
    return state;
  }
  if (action.reducerType !== ReducerType.Element) {
    return state;
  }

  const stateElementIndex = state.elements.findIndex(
    (element: { id: any }) => element.id === action.payload.id
  );
  const stateElement = state.elements[stateElementIndex];

  switch (action.type) {
    case 'toggle':
      stateElement.enabled = !stateElement.enabled;
      break;
    case 'scale':
      stateElement.scalingFactor += action.payload.adjustment;
      break;
    default:
      return state;
  }

  return Object.assign({}, state, { elements: state.elements });
};

export enum ReducerType {
  Plugin,
  Element
}

export interface IReducerActionParams {
  type: string;
  reducerType: ReducerType;
  payload: any;
}

export interface InitialStateType {
  // plugins: any[];
  elements: any[];
}

export const PluginElements = [
  new PluginElementToggleable({
    title: 'Emphasize Titles',
    enabled: false,
    actions: [
      new PluginActionClass({
        klass: [pluginStyles.emphasizeTitles]
      })
    ]
  }),
  new PluginElementScalable({
    title: 'Adjust Font Size',
    scalingIncrement: 0.1,
    actions: [
      new PluginActionProperty({
        property: {
          name: 'font-size',
          scalingType: DOMPropertyScalingType.Percentage
        },
        node: new TextNodeType().types
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Highlight Links',
    enabled: false,
    actions: [
      new PluginActionClass({
        klass: [pluginStyles.highlightLinksBlock]
      })
    ]
  }),
  new PluginElementScalable({
    title: 'Adjust Text Spacing',
    scalingIncrement: 1,
    actions: [
      new PluginActionProperty({
        property: {
          name: 'letter-spacing',
          scalingType: DOMPropertyScalingType.Absolute,
          unitType: 'px'
        },
        node: new TextNodeType().types
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Hide Images',
    enabled: false,
    actions: [
      new PluginActionClass({
        klass: [pluginStyles.hideImages]
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Readable Fonts',
    enabled: false,
    actions: [
      new PluginActionClass({
        klass: [pluginStyles.readableFonts]
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Highlight Forms',
    enabled: false,
    actions: [
      new PluginActionClass({
        klass: [pluginStyles.highlightForms]
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Emphasize Hover',
    enabled: false,
    actions: [
      new PluginActionClass({
        klass: [pluginStyles.emphasizeHover]
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Large Cursor (TODO: SVG troubles)',
    enabled: false,
    actions: [
      new PluginActionClass({
        klass: [pluginStyles.largeCursor]
      })
    ]
  })
];

const defaultStateElements = PluginElements.map(
  element => element.defaultState
);

export const initialState: InitialStateType = {
  elements: defaultStateElements
};

const rootReducer = combineReducers({
  elements: elementReducers
});

export const reducerInitializedStore = createStore(rootReducer);
