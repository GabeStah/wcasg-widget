import { Plugin, PluginActionTypes } from '@/types';
import TextNodeType from 'classes/node-types/TextNodeType';
import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionStyle } from 'classes/plugin/action/style';
import { Ids } from 'plugins/data';
import { select } from 'redux-saga/effects';
import { Selectors } from 'state/redux/selectors';

const actionStyle = new PluginActionStyle({
  name: 'adjust-font-size-action',
  style: {
    name: 'font-size',
    manipulationType: ValueManipulationType.PercentageScaling
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
  id: Ids.FontSize,
  title: 'Font Size',
  enabled: false,
  scaling: {
    baseFactor: 0,
    factor: 0,
    increment: 0.1,
    type: ValueManipulationType.PercentageScaling
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
