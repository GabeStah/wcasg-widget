import TextNodeType from 'classes/node-types/TextNodeType';
import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionStyle } from 'classes/plugin/action/style';
import { PluginElementScalable } from 'classes/plugin/element/scalable';

export const pluginFontSize = new PluginElementScalable({
  id: 'plugin-font-size',
  title: 'Font Size',
  scalingIncrement: 0.1,
  actions: [
    new PluginActionStyle({
      name: 'adjust-font-size-action',
      style: {
        name: 'font-size',
        manipulationType: ValueManipulationType.PercentageScaling
      },
      query: new TextNodeType().types.join(', ')
    })
  ]
});
