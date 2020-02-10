import { Plugin, PluginActionTypes } from '@/enum';
import { Ids } from 'plugins/data';
import { select } from 'redux-saga/effects';
import TextNodeType from '../../classes/node-types/TextNodeType';
import { ValueManipulationType } from '../../classes/plugin/action';
import { PluginActionStyle } from '../../classes/plugin/action/style';
import { Selectors } from '../../state/redux/selectors';

const actionStyle = new PluginActionStyle({
  name: 'adjust-letter-spacing-action',
  style: {
    name: 'letter-spacing',
    manipulationType: ValueManipulationType.AbsoluteScaling,
    unitType: 'px'
  },
  query: new TextNodeType().types.join(', ')
});

function* onEnableOrChange() {
  const state = yield select();
  const selectors = new Selectors(state);
  // Get latest state version.
  const plugin = selectors.getPlugin(pluginObject.id);
  if (!plugin.enabled) {
    return;
  }
  actionStyle.enable({ factor: plugin.scaling?.factor });
}

export const pluginObject: Plugin = {
  id: Ids.LetterSpacing,
  title: 'Text Spacing',
  enabled: false,
  options: [],
  scaling: {
    baseFactor: 0,
    factor: 0,
    increment: 1,
    type: ValueManipulationType.AbsoluteScaling
  },
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: [onEnableOrChange]
    },
    {
      on: PluginActionTypes.increment,
      func: [onEnableOrChange]
    },
    {
      on: PluginActionTypes.decrement,
      func: [onEnableOrChange]
    },
    {
      on: PluginActionTypes.disable,
      func: [() => actionStyle.disable()]
    }
  ]
};

export default pluginObject;
