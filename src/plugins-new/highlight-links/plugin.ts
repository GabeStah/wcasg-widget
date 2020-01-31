import { Plugin, PluginActionTypes } from '@/enum';
import styles from '@/plugins-new/highlight-links/styles.scss';
import { Css } from '@/utility/css';
import { Ids } from 'plugins-new/data';
import { select } from 'redux-saga/effects';
import { Selectors } from 'state/redux/selectors';

function* updateStyle() {
  const body = document.querySelectorAll('body')[0];
  const state = yield select();
  const selectors = new Selectors(state);
  const plugin = selectors.getPlugin(pluginObject.id);
  const options = selectors.getPluginOption(plugin.id);

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

  if (options && plugin.enabled) {
    const selected = options.find(option => option.selected);
    if (selected) {
      let styleName = styles.highlightLinksBoth;
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
}

export const pluginObject: Plugin = {
  id: Ids.HighlightLinks,
  title: 'Highlight Links',
  enabled: false,
  options: [
    {
      id: 0,
      name: 'style',
      text: 'Block',
      value: 'block',
      selected: true
    },
    {
      id: 1,
      name: 'style',
      text: 'Border',
      value: 'border'
    },
    {
      id: 2,
      name: 'style',
      text: 'Both',
      value: 'both'
    }
  ],
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
      func: [
        updateStyle
        // function* hello() {
        //   yield changeSelectOption();
        // }
      ]
    }
  ]
};

export default pluginObject;
