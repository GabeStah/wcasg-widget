import {
  Plugin,
  PluginActionTypes,
  PluginPropertyComponentTypes
} from '@/types';
import styles from '@/plugins/highlight-links/styles.scss';
import { Css } from '@/utility/css';
import { Ids } from 'plugins/data';
import { select } from 'redux-saga/effects';
import { Selectors } from 'state/redux/selectors';

function* updateStyle() {
  const body = document.querySelectorAll('body')[0];
  const state = yield select();
  const selectors = new Selectors(state);
  // Get latest state version.
  const plugin = selectors.getPlugin(pluginObject.id);
  const selected = selectors.getPluginPropertySelectedOption({
    plugin,
    property: 'style'
  });

  Css.removeClass({
    node: body,
    name: styles.highlightLinksBorder
  });
  Css.removeClass({
    node: body,
    name: styles.highlightLinksBlock
  });
  Css.removeClass({
    node: body,
    name: styles.highlightLinksBoth
  });

  if (selected && plugin.enabled) {
    let styleName: any;
    switch (selected.value) {
      case 'block':
        styleName = styles.highlightLinksBlock;
        break;
      case 'border':
        styleName = styles.highlightLinksBorder;
        break;
      case 'both':
        styleName = styles.highlightLinksBoth;
        break;
      default:
        styleName = styles.highlightLinksBoth;
        break;
    }

    Css.addClass({
      node: body,
      name: styleName
    });
  }
}

export const pluginObject: Plugin = {
  id: Ids.HighlightLinks,
  title: 'Highlight Links',
  enabled: false,
  config: {
    props: [
      {
        id: 'style',
        name: 'Default',
        componentType: PluginPropertyComponentTypes.Select,
        enablePluginOnChange: true,
        disablePluginOnValue: '',
        options: [
          {
            id: 'block',
            text: 'Block',
            value: 'block'
          },
          {
            id: 'border',
            text: 'Border',
            value: 'border'
          },
          {
            id: 'both',
            text: 'Both',
            value: 'both'
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
