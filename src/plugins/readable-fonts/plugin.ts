import { Plugin, PluginActionTypes } from '@/enum';
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
  const options = selectors.getPluginOptions({ pluginId: plugin.id });

  if (options && plugin.enabled) {
    const selected = options.find(option => option.selected);
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
  options: [
    {
      id: 0,
      name: 'font',
      text: 'Arial',
      value: 'Arial'
    },
    {
      id: 1,
      name: 'font',
      text: 'Montserrat',
      value: 'Montserrat'
    },
    {
      id: 2,
      name: 'font',
      text: 'Nunito',
      value: 'Nunito'
    },
    {
      id: 3,
      name: 'font',
      text: 'Roboto',
      value: 'Roboto'
    },
    {
      id: 4,
      name: 'font',
      text: 'Rubik',
      value: 'Rubik'
    },
    {
      id: 5,
      name: 'font',
      text: 'Ubuntu',
      value: 'Ubuntu'
    }
  ],
  optionName: 'Default',
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
      on: PluginActionTypes.selectOption,
      func: [updateFont]
    }
  ]
};

export default pluginObject;
