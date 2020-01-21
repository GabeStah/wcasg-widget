import config from 'config';
import mapValues from 'lodash/mapValues';
import { DOMManipulationType } from '@/plugins';
import { IPlugin } from 'plugins/base/IPlugin';
import { BasePluginParamsType } from 'plugins/base/BasePluginParamsType';

export default abstract class BasePlugin implements IPlugin {
  get dataAttributeName(): string {
    return `data-${config.widgetId}-original-${this.id}`;
  }

  get initialState() {
    return {
      id: this.id
    };
  }

  public static actions = {};

  public static mapDispatchToProps = (dispatch: any, props: any) => {
    return mapValues(BasePlugin.actions, (action: (arg0: any) => any) => {
      return () => dispatch(action(props.id));
    });
  };

  public static mapStateToProps = (state: any, { id }: any): any => {
    const { plugins } = state.plugins;
    const statePlugin = plugins.find((plugin: { id: any }) => plugin.id === id);

    return { current: statePlugin.current };
  };

  public id: string;
  public title: string;
  public domManipulationType: DOMManipulationType =
    DOMManipulationType.BodyClass;

  protected constructor(params: BasePluginParamsType) {
    this.id = params.id;
    this.title = params.title;
  }

  public abstract onMount(props?: object): void;

  public abstract toComponent(): any;
}
