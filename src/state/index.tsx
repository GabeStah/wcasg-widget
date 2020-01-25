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
import find from 'lodash/find';
import findLast from 'lodash/findLast';
import { createSelector } from 'root/node_modules/reselect';
import { PluginElementCustom } from 'plugins/element/custom';
import styles from 'styles/plugin/element.scss';
import Utility from '@/utility';
import config from 'config';
// import LibGif from 'assets/js/libgif';
// require('svg-url-loader!../../src/assets/cursor.svg');

// Create out-of-scope selectors for use in components.
export const makeElementScalingFactorSelector = () =>
  createSelector(
    (state: any) => state.elements.elements,
    (_: any, id: any) => id,
    (elements: any, id: any) => find(elements, ['id', id]).scalingFactor
  );

export const makeElementEnabledSelector = () =>
  createSelector(
    (state: any) => state.elements.elements,
    (_: any, id: any) => id,
    (elements: any, id: any) => find(elements, ['id', id]).enabled
  );

export const elementReducers = (
  state: InitialStateType = initialState,
  action: IReducerActionParams
) => {
  switch (action.type) {
    case 'toggle':
      return Object.assign({}, state, {
        elements: state.elements.map((element: any) => {
          if (element.id === action.payload.id) {
            return Object.assign({}, element, {
              enabled: !element.enabled
            });
          }
          return element;
        })
      });
    case 'scale':
      return Object.assign({}, state, {
        elements: state.elements.map((element: any) => {
          if (element.id === action.payload.id) {
            return Object.assign({}, element, {
              scalingFactor: element.scalingFactor + action.payload.adjustment
            });
          }
          return element;
        })
      });
    default:
      return state;
  }
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
  elements: any;
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
        query: ['.btn', '.button', 'a', 'span', 'li', 'button'].join(', ')
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Light Contrast',
    enabled: false,
    actions: [
      new PluginActionClass({
        name: 'light-contrast-action-style',
        klass: [lightContrastStyles.lightContrast],
        query: 'html'
      }),
      new PluginActionProperty({
        name: 'light-contrast-action-background-image',
        property: {
          name: 'background-image',
          manipulationType: DOMPropertyManipulationType.Toggle,
          // Value assigned to property when action is enabled.
          enabledValue: 'none'
        },
        query: ['.btn', '.button', 'a', 'span', 'li', 'button'].join(', ')
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Black & Yellow',
    enabled: false,
    actions: [
      new PluginActionClass({
        name: 'black-and-yellow-action-style',
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
        query: ['.btn', '.button', 'a', 'span', 'li', 'button'].join(', ')
      })
    ]
  }),
  new PluginElementCustom({
    title: 'Page Navigation',
    /**
     * Gather collection of headers and links, in order of DOM tree.
     *
     * TODO: Eliminate duplications wherever possible.
     *
     * @param self
     */
    initialize: (self: any) => {
      const headerTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
      const allTags = headerTags.concat('A');
      const elements = document.querySelectorAll(allTags.join(', '));
      const options: any[] = [];
      // Iterate nodes
      elements.forEach((element: any) => {
        // Get ARIA text of element
        const text = Utility.Aria.getElementText({ element }).trim();
        // If header
        if (headerTags.includes(element.tagName)) {
          options.push({
            tagName: element.tagName,
            text,
            element,
            links: []
          });
        } else {
          const latestHeader = findLast(options, option =>
            headerTags.includes(option.tagName)
          );
          if (latestHeader) {
            latestHeader.links.push({
              tagName: element.tagName,
              text,
              href: element.href,
              element
            });
          } else {
            options.push({
              tagName: element.tagName,
              text,
              href: element.href,
              element
            });
          }
        }
      });

      self.options.navigation = options;
    },
    /**
     * Renders page navigation select box based on parsed navigation array in init.
     *
     * TODO: Improve via aria specs with keyboard nav/search.
     * @see https://www.w3.org/TR/wai-aria-practices-1.2/examples/listbox/listbox-grouped.html
     *
     * @see https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox
     *
     * @param self
     * @returns {any}
     */
    template: (self: any) => {
      const headerTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
      const options = self.options.navigation.map((item: any, index: any) => {
        if (headerTags.includes(item.tagName)) {
          return (
            <optgroup key={index} label={`[${item.tagName}]${item.text}`}>
              {item.links.map((link: any, linkIndex: any) => {
                // Ensure href exists.
                if (link.href) {
                  return (
                    <option key={linkIndex} value={link.href}>
                      {link.text}
                    </option>
                  );
                }
              })}
            </optgroup>
          );
        } else {
          // Ensure href exists.
          if (item.href) {
            return (
              <option key={index} value={item.href}>
                {item.text}
              </option>
            );
          }
        }
      });

      const handleOnChange = (e: any) => {
        try {
          window.location.href = e.target.options[e.target.selectedIndex].value;
        } catch (error) {
          // Likely CORS failure.
          Utility.throwError(error);
        }
      };

      return (
        <div
          className={`${styles['plugin-element']} ${styles['plugin-element-custom']}`}
        >
          <h3>{self.title}</h3>
          <select
            id={`${config.widgetId}-page-navigation-select`}
            name={'page-navigation'}
            size={1}
            onChange={handleOnChange}
          >
            {options}
          </select>
        </div>
      );
    }
  }),
  // new PluginElementToggleable({
  //   title: 'Test Func',
  //   enabled: false,
  //   actions: [
  //     new PluginActionFunction({
  //       name: 'text-func-action',
  //       func: [
  //         () => {
  //           const images = document.querySelectorAll(['img'].join(', '));
  //           if (images && images.length > 0) {
  //             images.forEach(image => {
  //               // const gif = new LibGif({ gif: image });
  //             });
  //           }
  //         },
  //         () => console.log('test2')
  //       ]
  //     })
  //   ]
  // }),
  new PluginElementToggleable({
    title: 'Stop CSS Animations',
    enabled: false,
    actions: [
      new PluginActionClass({
        name: 'stop-css-animations-action',
        klass: [pluginStyles.stopGlobalAnimations],
        query: 'body'
      })
    ]
  }),
  new PluginElementToggleable({
    title: 'Mute Audio',
    enabled: false,
    actions: [
      new PluginActionProperty({
        name: 'mute-audio-action',
        property: {
          name: 'muted',
          manipulationType: DOMPropertyManipulationType.Direct,
          baseValue: 'false',
          enabledValue: 'true',
          disabledValue: 'false'
        },
        query: ['audio', 'video'].join(', ')
      })
    ]
  })
];

const defaultStateElements = PluginElements.map((element: any) =>
  element.getInstanceState()
);

export const initialState: InitialStateType = {
  elements: defaultStateElements
};

const rootReducer = combineReducers({
  elements: elementReducers
});

export const reducerInitializedStore = createStore(rootReducer);
