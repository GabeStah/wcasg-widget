import TextNodeType from 'classes/node-types/TextNodeType';
import { ValueManipulationType } from 'classes/plugin/action';
import { PluginActionStyle } from 'classes/plugin/action/style';
import { PluginElementScalable } from 'classes/plugin/element/scalable';

export const pluginTextSpacing = new PluginElementScalable({
  id: 'plugin-text-spacing',
  title: 'Adjust Text Spacing',
  scalingIncrement: 1,
  actions: [
    new PluginActionStyle({
      name: 'adjust-text-spacing-action',
      style: {
        name: 'letter-spacing',
        manipulationType: ValueManipulationType.AbsoluteScaling,
        unitType: 'px'
      },
      query: new TextNodeType().types.join(', ')
    })
  ]
});
