import find from 'lodash/find';
import { pluginBlackAndYellow } from 'plugins/black-and-yellow';
import { pluginDarkContrast } from 'plugins/dark-contrast';
import { pluginEmphasizeHover } from 'plugins/emphasize-hover';
import { pluginEmphasizeTitles } from 'plugins/emphasize-titles';
import { pluginFontSize } from 'plugins/font-size';
import { pluginGrayscale } from 'plugins/grayscale';
import { pluginHideImages } from 'plugins/hide-images';
import { pluginHighlightForms } from 'plugins/highlight-forms';
import { pluginHighlightLinks } from 'plugins/highlight-links';
import { pluginInvertColors } from 'plugins/invert-colors';
import { pluginKeyboardNavigation } from 'plugins/keyboard-navigation';
import { pluginLargeCursor } from 'plugins/large-cursor';
import { pluginLightContrast } from 'plugins/light-contrast';
import { pluginMuteAudio } from 'plugins/mute-audio';
import { pluginPageNavigation } from 'plugins/page-navigation';
import { pluginReadableFonts } from 'plugins/readable-fonts';
import { pluginStopAnimations } from 'plugins/stop-animations';
import { pluginTextSpacing } from 'plugins/text-spacing';
import { pluginTooltip } from 'plugins/tooltip';
import React from 'react';
import { combineReducers, createStore } from 'redux';
import { createSelector } from 'reselect';
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

export interface IReducerActionParams {
  type: string;
  payload: any;
}

export interface InitialStateType {
  elements: any;
}

export const Plugins = [
  pluginEmphasizeTitles,
  pluginFontSize,
  pluginHighlightLinks,
  pluginTextSpacing,
  pluginHideImages,
  pluginReadableFonts,
  pluginHighlightForms,
  pluginEmphasizeHover,
  pluginLargeCursor,
  pluginInvertColors,
  pluginGrayscale,
  pluginDarkContrast,
  pluginLightContrast,
  pluginBlackAndYellow,
  pluginPageNavigation,
  pluginStopAnimations,
  pluginMuteAudio,
  pluginKeyboardNavigation,
  pluginTooltip
];

const defaultStateElements = Plugins.map((element: any) =>
  element.getInstanceState()
);

export const initialState: InitialStateType = {
  elements: defaultStateElements
};

const rootReducer = combineReducers({
  elements: elementReducers
});

export const reducerInitializedStore = createStore(rootReducer);
