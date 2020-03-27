import {
  Plugin,
  PluginActionTypes,
  PluginPropertyComponentTypes
} from '@/types';
import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionStyle } from 'classes/plugin/action/style';
import { Ids } from 'plugins/data';
import { select } from 'redux-saga/effects';
import { Selectors } from 'state/redux/selectors';

const tags = [
  'p',
  'li',
  'label',
  'input',
  'select',
  'textarea',
  'legend',
  'code',
  'pre',
  'dd',
  'dt',
  'span',
  'blockquote',
  'a',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6'
];

const actionProperty = new PluginActionStyle({
  style: {
    name: 'font-family',
    manipulationType: ValueManipulationType.Direct,
    enabledValue: `Arial !important;`
  },
  cacheNodes: false,
  query: tags.join(', ')
});

function* updateFont() {
  const state = yield select();
  const selectors = new Selectors(state);
  // Get latest state version.
  const plugin = selectors.getPlugin(pluginObject.id);
  const selected = selectors.getPluginPropertySelectedOption({
    plugin,
    property: 'font'
  });

  if (plugin.enabled) {
    if (selected) {
      actionProperty.style.enabledValue = `${selected.value}`;
      actionProperty.enable();
    } else {
      actionProperty.disable();
    }
  } else {
    actionProperty.disable();
  }
}

export const pluginObject: Plugin = {
  id: Ids.ReadableFonts,
  title: 'Alternative Fonts',
  enabled: false,
  config: {
    props: [
      {
        id: 'font',
        name: 'Default',
        componentType: PluginPropertyComponentTypes.Select,
        enablePluginOnChange: true,
        disablePluginOnValue: '',
        options: [
          {
            id: 'Arial',
            text: 'Arial',
            value: 'Arial'
          },
          {
            id: 'Montserrat',
            text: 'Montserrat',
            value: 'Montserrat'
          },
          {
            id: 'Nunito',
            text: 'Nunito',
            value: 'Nunito'
          },
          {
            id: 'Roboto',
            text: 'Roboto',
            value: 'Roboto'
          },
          {
            id: 'Rubik',
            text: 'Rubik',
            value: 'Rubik'
          },
          {
            id: 'Ubuntu',
            text: 'Ubuntu',
            value: 'Ubuntu'
          }
        ]
      }
    ]
  },
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: [updateFont]
    },
    {
      on: PluginActionTypes.disable,
      func: [updateFont]
    },
    {
      on: PluginActionTypes.selectPropertyOption,
      func: [updateFont]
    }
  ]
};

export default pluginObject;
