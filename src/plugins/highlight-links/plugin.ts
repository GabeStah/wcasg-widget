import { Plugin, PluginActionTypes } from '@/enum';
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
      value: 'block'
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

interface PluginConfigOption {
  id: string;
}

interface PluginConfig {}

enum PluginOptionTypes {}

/**
 * OptionTypes
 *
 */

interface PluginOption {
  id: number;
  name: string;
  selected?: boolean;
  text: string;
  value: string | number | boolean;
}

const pluginStateFontSize: any = {
  id: 'font-size',
  config: [
    {
      id: 'enabled',
      value: true
    },
    {
      id: 'pitch',
      value: 0
    },
    {
      id: 'voice',
      value: 'en-US-Wavenet-A'
    }
  ]
};

const pluginState: any = {
  id: 'text-to-speech',
  config: [
    {
      id: 'enabled',
      value: true
    },
    {
      id: 'pitch',
      value: 0
    },
    {
      id: 'voice',
      value: 'en-US-Wavenet-A'
    }
  ]
};

const pluginConfig: any = {
  id: 'text-to-speech',
  state: [
    {
      id: 'enabled',
      key: 'value'
    },
    {
      id: 'pitch',
      key: 'value'
    },
    {
      id: 'volume',
      key: 'value'
    },
    {
      id: 'voice',
      key: 'value'
    }
  ],
  config: [
    {
      id: 'enabled',
      pluginId: 'text-to-speech',
      type: 'boolean',
      value: false
    },
    {
      // type: number
      id: 'pitch',
      pluginId: 'text-to-speech',
      type: 'number',
      value: 0,
      options: {
        minimum: -20,
        step: 1,
        maximum: 20
      }
    },
    {
      // type: number
      id: 'volume',
      pluginId: 'text-to-speech',
      minimum: -20,
      step: 1,
      maximum: 20,
      value: 0
    },
    {
      // type: number
      id: 'rate',
      pluginId: 'text-to-speech',
      minimum: 0.25,
      step: 0.25,
      maximum: 4,
      value: 1
    },
    {
      // type: choose-one
      id: 'voice',
      pluginId: 'text-to-speech',
      value: undefined,
      options: [
        {
          value: 'en-US-Wavenet-A'
        }
      ]
    }
  ]
};

export default pluginObject;
