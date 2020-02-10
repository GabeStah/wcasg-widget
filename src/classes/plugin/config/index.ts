interface PluginConfigOption {
  id: string;
}

enum PluginOptionTypes {}

/**
 * OptionTypes
 *
 */

// interface PluginOption {
//   id: number;
//   name: string;
//   selected?: boolean;
//   text: string;
//   value: string | number | boolean;
// }

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

interface PluginStateProperty {
  id: string;
  key: string;
  type: PluginPropertyTypes;
}

export enum PluginPropertyTypes {
  Boolean = 'boolean',
  Number = 'number',
  String = 'string'
}

interface PluginProperty {
  id: string;
  options?: Array<
    PluginPropertyOptionScalable | PluginPropertyOptionSelectable
  >;
  optionType: PluginPropertyOptionTypes;
  value: any;
}

export enum PluginPropertyOptionTypes {
  Scalable = 'scalable',
  Selectable = 'selectable',
  Toggleable = 'toggleable'
}

interface PluginPropertyOption {
  // type: PluginPropertyOptionTypes;
}

interface PluginPropertyOptionScalable extends PluginPropertyOption {
  maximum: number;
  minimum: number;
  step: number;
}

interface PluginPropertyOptionSelectable extends PluginPropertyOption {
  text: string | number | boolean;
  value: string | number | boolean;
}

export interface PluginConfig {
  id: string;
  stateProps: PluginStateProperty[];
  props: PluginProperty[];
}

const textToSpeechConfig: PluginConfig = {
  id: 'text-to-speech',
  stateProps: [
    {
      id: 'enabled',
      key: 'value',
      type: PluginPropertyTypes.Boolean
    },
    {
      id: 'pitch',
      key: 'value',
      type: PluginPropertyTypes.Number
    },
    {
      id: 'volume',
      key: 'value',
      type: PluginPropertyTypes.Number
    },
    {
      id: 'voice',
      key: 'value',
      type: PluginPropertyTypes.String
    }
  ],
  props: [
    {
      id: 'enabled',
      optionType: PluginPropertyOptionTypes.Toggleable,
      value: false
    },
    {
      // type: number
      id: 'pitch',
      optionType: PluginPropertyOptionTypes.Scalable,
      value: 0,
      options: [
        {
          minimum: -20,
          step: 1,
          maximum: 20
        }
      ]
    },
    {
      // type: number
      id: 'volume',
      optionType: PluginPropertyOptionTypes.Scalable,
      value: 2,
      options: [
        {
          minimum: -96,
          step: 1,
          maximum: 16
        }
      ]
    },
    {
      // type: number
      id: 'rate',
      optionType: PluginPropertyOptionTypes.Scalable,
      value: 1,
      options: [
        {
          minimum: 0.25,
          step: 0.25,
          maximum: 4
        }
      ]
    },
    {
      // type: choose-one
      id: 'voice',
      optionType: PluginPropertyOptionTypes.Selectable,
      value: undefined,
      options: [
        {
          text: 'en-US-Wavenet-A',
          value: 'en-US-Wavenet-A'
        }
      ]
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
