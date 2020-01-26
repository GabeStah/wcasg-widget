import { IPluginAction } from 'classes/plugin/action';
import { IPluginElement } from 'classes/plugin/element';

export const Plugin = {
  Action: {
    getParentElement: ({
      action,
      plugins
    }: {
      action: IPluginAction | string;
      plugins: IPluginElement[];
    }): IPluginElement | void => {
      return plugins.find((element: IPluginElement) => {
        if (element.actions) {
          const matchedAction = element.actions.find(
            (elementAction: IPluginAction) => {
              return typeof action === 'string'
                ? elementAction.id === action
                : elementAction.id === action.id;
            }
          );
          if (matchedAction) {
            return element;
          }
        }
      });
    }
  }
};

export default Plugin;
