import {
  Plugin,
  PluginActionTypes,
  PluginPropertyComponentTypes
} from '@/types';
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
import { Selectors } from 'state/redux/selectors';

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
  forEach(plugins, (actions: Array<PluginActionClass | PluginActionStyle>) => {
    forEach(actions, (action: PluginActionClass | PluginActionStyle) => {
      action.disable();
    });
  });

  const state = yield select();
  const selectors = new Selectors(state);
  // Get latest state version.
  const plugin = selectors.getPlugin(pluginObject.id);
  const selected = selectors.getPluginPropertySelectedOption({
    plugin,
    property: 'theme'
  });

  if (plugin.enabled && selected && typeof selected.value === 'string') {
    forEach(
      plugins[selected.value],
      (action: PluginActionClass | PluginActionStyle) => {
        action.enable();
      }
    );
  }
}

export const pluginObject: Plugin = {
  id: Ids.Contrast,
  title: 'Contrast',
  enabled: false,
  config: {
    props: [
      {
        id: 'theme',
        name: 'Default',
        componentType: PluginPropertyComponentTypes.Select,
        enablePluginOnChange: true,
        options: [
          {
            id: 'black-and-yellow',
            text: 'Black and Yellow',
            value: 'black-and-yellow'
          },
          {
            id: 'dark-contrast',
            text: 'Dark Contrast',
            value: 'dark-contrast'
          },
          {
            id: 'light-contrast',
            text: 'Light Contrast',
            value: 'light-contrast'
          },
          {
            id: 'invert-colors',
            text: 'Invert Colors',
            value: 'invert-colors'
          },
          {
            id: 'grayscale',
            text: 'Grayscale',
            value: 'grayscale'
          }
        ]
      }
    ]
  },
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
      on: PluginActionTypes.selectPropertyOption,
      func: [updateStyle]
    }
  ]
};

export default pluginObject;
