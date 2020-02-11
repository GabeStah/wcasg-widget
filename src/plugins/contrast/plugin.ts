import { Plugin, PluginActionTypes } from '@/enum';
import { Css } from '@/utility/css';
import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionClass } from 'classes/plugin/action/class';
import { PluginActionStyle } from 'classes/plugin/action/style';
import { Ids } from 'plugins/data';
import { select } from 'redux-saga/effects';
import { Selectors } from 'state/redux/selectors';
import forEach from 'lodash/forEach';
import styles from './styles.scss';

import {
  actionStyle as actionStyleBlackAndYellow,
  actionClass as actionClassBlackAndYellow
} from 'plugins/black-and-yellow/plugin';
import {
  actionStyle as actionStyleDarkContrast,
  actionClass as actionClassDarkContrast
} from 'plugins/dark-contrast/plugin';
import {
  actionStyle as actionStyleLightContrast,
  actionClass as actionClassLightContrast
} from 'plugins/light-contrast/plugin';
import { actionClass as actionClassGrayscale } from 'plugins/grayscale/plugin';
import { actionClass as actionClassInvertColors } from 'plugins/invert-colors/plugin';

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
  // const body = document.querySelectorAll('body')[0];
  const state = yield select();
  const selectors = new Selectors(state);
  // Get latest state version.
  const plugin = selectors.getPlugin(pluginObject.id);
  const options = selectors.getPluginOption(plugin.id);

  // Css.removeClass({
  //   node: body,
  //   name: styles.highlightLinksBorder
  // });
  // Css.removeClass({
  //   node: body,
  //   name: styles.highlightLinksBlock
  // });
  // Css.removeClass({
  //   node: body,
  //   name: styles.highlightLinksBoth
  // });

  if (options && plugin.enabled) {
    const selected = options.find(option => option.selected);
    if (selected && typeof selected.value === 'string') {
      forEach(
        plugins[selected.value],
        (action: PluginActionClass | PluginActionStyle) => {
          action.enable();
        }
      );
      //
      //
      // let styleName = styles.highlightLinksBoth;
      // switch (selected.value) {
      //   case 'block':
      //     styleName = styles.highlightLinksBlock;
      //     break;
      //   case 'border':
      //     styleName = styles.highlightLinksBorder;
      //     break;
      //   case 'both':
      //     styleName = styles.highlightLinksBoth;
      //     break;
      //   default:
      //     styleName = styles.highlightLinksBoth;
      //     break;
      // }
      //
      // Css.addClass({
      //   node: body,
      //   name: styleName
      // });
    }
  }
}
//
// const actionClass = new PluginActionClass({
//   name: 'dark-contrast-action-style',
//   klass: [styles.darkContrast],
//   query: 'html'
// });
// const actionStyle = new PluginActionStyle({
//   name: 'dark-contrast-action-background-image',
//   style: {
//     name: 'background-image',
//     manipulationType: ValueManipulationType.Toggle,
//     // Value assigned to property when action is enabled.
//     enabledValue: 'none'
//   },
//   query: ['.btn', '.button', 'a', 'span', 'li', 'button'].join(', ')
// });
//
// function* onEnable() {
//   actionClass.enable();
//   actionStyle.enable();
// }
//
// function* onDisable() {
//   actionClass.disable();
//   actionStyle.disable();
// }

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
