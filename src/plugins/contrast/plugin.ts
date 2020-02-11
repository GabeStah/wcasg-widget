import { Plugin, PluginActionTypes } from '@/enum';
import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginActionStyle } from 'classes/plugin/action/style';
import forEach from 'lodash/forEach';

import {
  actionClass as actionClassBlackAndYellow,
  actionStyle as actionStyleBlackAndYellow
} from 'plugins/black-and-yellow/plugin';
import {
  actionClass as actionClassDarkContrast,
  actionStyle as actionStyleDarkContrast
} from 'plugins/dark-contrast/plugin';
import { Ids } from 'plugins/data';
import { actionClass as actionClassGrayscale } from 'plugins/grayscale/plugin';
import { actionClass as actionClassInvertColors } from 'plugins/invert-colors/plugin';
import {
  actionClass as actionClassLightContrast,
  actionStyle as actionStyleLightContrast
} from 'plugins/light-contrast/plugin';
import { select } from 'redux-saga/effects';
// import { ActionCreators } from 'state/redux/actions';
import { Selectors } from 'state/redux/selectors';
import { ThemeTypes } from 'theme/types';

interface ContrastPlugins {
  [key: string]: Array<PluginActionClass | PluginActionStyle>;
}

const plugins: ContrastPlugins = {
  'black-and-yellow': [actionStyleBlackAndYellow, actionClassBlackAndYellow],
  'dark-contrast': [actionStyleDarkContrast, actionClassDarkContrast],
  grayscale: [actionClassGrayscale],
  'invert-colors': [actionClassInvertColors],
  'light-contrast': [actionStyleLightContrast, actionClassLightContrast]
};

function* updateStyle() {
  // Disable everything.
  forEach(
    plugins,
    (actions: Array<PluginActionClass | PluginActionStyle>, key: string) => {
      forEach(actions, (action: PluginActionClass | PluginActionStyle) => {
        action.disable();
      });
    }
  );

  const state = yield select();
  const selectors = new Selectors(state);
  const themeType = new Selectors(state).getTheme();
  // Get latest state version.
  const plugin = selectors.getPlugin(pluginObject.id);
  const options = selectors.getPluginOption(plugin.id);

  if (options && plugin.enabled) {
    const selected = options.find(option => option.selected);
    if (selected && typeof selected.value === 'string') {
      forEach(
        plugins[selected.value],
        (action: PluginActionClass | PluginActionStyle) => {
          action.enable();
        }
      );
    }
  }
}

export const pluginObject: Plugin = {
  id: Ids.Contrast,
  title: 'Contrast',
  enabled: false,
  options: [
    {
      id: 0,
      name: 'style',
      text: 'Black and Yellow',
      value: 'black-and-yellow'
    },
    {
      id: 1,
      name: 'style',
      text: 'Dark Contrast',
      value: 'dark-contrast'
    },
    {
      id: 2,
      name: 'style',
      text: 'Light Contrast',
      value: 'light-contrast'
    },
    {
      id: 3,
      name: 'style',
      text: 'Invert Colors',
      value: 'invert-colors'
    },
    {
      id: 4,
      name: 'style',
      text: 'Grayscale',
      value: 'grayscale'
    }
  ],
  optionName: 'Default',
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: [updateStyle]
    },
    {
      on: PluginActionTypes.disable,
      func: [updateStyle]
    },
    {
      on: PluginActionTypes.selectOption,
      func: [updateStyle]
    }
  ]
};

export default pluginObject;
