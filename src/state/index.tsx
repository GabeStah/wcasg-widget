import React from 'react';
import { combineReducers, createStore } from 'redux';
import constrastStyles from 'styles/contrast/index.scss';
import blackAndYellowStyles from 'styles/contrast/black-and-yellow.scss';
import lightContrastStyles from 'styles/contrast/light-contrast.scss';
import darkContrastStyles from 'styles/contrast/dark-contrast.scss';
import pluginStyles from 'styles/plugin-styles.scss';
import { PluginActionClass } from 'plugins/action/class';
import { PluginElementToggleable } from 'plugins/element/toggleable/';
import { PluginElementScalable } from 'plugins/element/scalable';
import {
  DOMPropertyManipulationType,
  PluginActionProperty
} from 'plugins/action/property';
import TextNodeType from 'classes/node-types/TextNodeType';
import { PluginActionFunction } from 'plugins/action/function';
// import LibGif from 'assets/js/libgif';
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
        name: 'emphasize-titles-action',
        klass: [pluginStyles.emphasizeTitles]
      })
    ]
  }),
  new PluginElementScalable({
    title: 'Adjust Font Size',
    scalingIncrement: 0.1,
    actions: [
      new PluginActionProperty({
        name: 'adjust-font-size-action',
        property: {
          name: 'font-size',
          manipulationType: DOMPropertyManipulationType.PercentageScaling
        },
        query: new TextNodeType().types.join(', ')
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Highlight Links',
    enabled: false,
    actions: [
      new PluginActionClass({
        name: 'highlight-links-action',
        klass: [pluginStyles.highlightLinksBlock]
      })
    ]
  }),
  new PluginElementScalable({
    title: 'Adjust Text Spacing',
    scalingIncrement: 1,
    actions: [
      new PluginActionProperty({
        name: 'adjust-text-spacing-action',
        property: {
          name: 'letter-spacing',
          manipulationType: DOMPropertyManipulationType.AbsoluteScaling,
          unitType: 'px'
        },
        query: new TextNodeType().types.join(', ')
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Hide Images',
    enabled: false,
    actions: [
      new PluginActionClass({
        name: 'hide-images-action',
        klass: [pluginStyles.hideImages]
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Readable Fonts',
    enabled: false,
    actions: [
      new PluginActionClass({
        name: 'readable-fonts-action',
        klass: [pluginStyles.readableFonts]
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Highlight Forms',
    enabled: false,
    actions: [
      new PluginActionClass({
        name: 'highlight-forms-action',
        klass: [pluginStyles.highlightForms]
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Emphasize Hover',
    enabled: false,
    actions: [
      new PluginActionClass({
        name: 'emphasize-hover-action',
        klass: [pluginStyles.emphasizeHover]
      })
    ]
  }),
  // TODO: Fix SVG issue (see #9).
  // new PluginElementToggleable({
  //   title: 'Large Cursor (TODO: SVG troubles)',
  //   enabled: false,
  //   actions: [
  //     new PluginActionClass({
  //       name: 'large-cursor-action',
  //       klass: [pluginStyles.largeCursor]
  //     })
  //   ]
  // }),
  new PluginElementToggleable({
    title: 'Invert Colors',
    enabled: false,
    actions: [
      new PluginActionClass({
        name: 'invert-colors-action',
        klass: [constrastStyles.invert],
        query: 'html'
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Grayscale',
    enabled: false,
    actions: [
      new PluginActionClass({
        name: 'grayscale-action',
        klass: [constrastStyles.grayscale],
        query: 'html'
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Dark Contrast',
    enabled: false,
    actions: [
      new PluginActionClass({
        name: 'dark-contrast-action-style',
        klass: [darkContrastStyles.darkContrast],
        query: 'html'
      }),
      new PluginActionProperty({
        name: 'dark-contrast-action-background-image',
        property: {
          name: 'background-image',
          manipulationType: DOMPropertyManipulationType.Toggle,
          // Value assigned to property when action is enabled.
          enabledValue: 'none'
        },
        // query: ['.btn', '.button', 'a', 'span', 'li', 'button'].join(', ')
        query: '#test'
      })
    ]
  }),
  // new PluginElementToggleable({
  //   title: 'Light Contrast',
  //   enabled: false,
  //   actions: [
  //     new PluginActionClass({
  //       name: 'light-contrast-action-style',
  //       klass: [lightContrastStyles.lightContrast],
  //       query: 'html'
  //     }),
  //     new PluginActionProperty({
  //       name: 'light-contrast-action-background-image',
  //       property: {
  //         name: 'background-image',
  //         manipulationType: DOMPropertyManipulationType.Toggle,
  //         // Value assigned to property when action is enabled.
  //         enabledValue: 'none'
  //       },
  //       query: ['.btn', '.button', 'a', 'span', 'li', 'button'].join(', ')
  //     })
  //   ]
  // }),
  new PluginElementToggleable({
    title: 'Black & Yellow',
    enabled: false,
    actions: [
      new PluginActionClass({
        name: 'black-and-yell0w-action-style',
        klass: [blackAndYellowStyles.blackAndYellow],
        query: 'html'
      }),
      new PluginActionProperty({
        name: 'black-and-yellow-action-background-image',
        property: {
          name: 'background-image',
          manipulationType: DOMPropertyManipulationType.Toggle,
          // Value assigned to property when action is enabled.
          enabledValue: 'none'
        },
        // query: ['.btn', '.button', 'a', 'span', 'li', 'button'].join(', ')
        query: '#test'
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Test Func',
    enabled: false,
    actions: [
      new PluginActionFunction({
        name: 'text-func-action',
        func: [
          () => {
            const images = document.querySelectorAll(['img'].join(', '));
            if (images && images.length > 0) {
              images.forEach(image => {
                // const gif = new LibGif({ gif: image });
                // console.log(gif);
              });
            }
          },
          () => console.log('test2')
        ]
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
