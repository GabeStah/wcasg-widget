import config from 'config';
import mapValues from 'lodash/mapValues';

export interface IPlugin {
  id: string;
  title: string;
  dataAttributeName: string;
  initialState: object;
  onMount(props?: object): void;
}

export interface BasePluginParamsType {
  id: string;
  title: string;
}

export default class BasePlugin implements IPlugin {
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

  public static mapStateToProps = (state: any, { id }: any) => {
    // Extract reducers from combined state.
    const { plugins } = state.plugins;
    const statePlugin = plugins.find((plugin: { id: any }) => plugin.id === id);

    return { current: statePlugin.current };
  };

  public id: string;
  public title: string;

  constructor(params: BasePluginParamsType) {
    this.id = params.id;
    this.title = params.title;
  }

  public onMount(props?: object) {}
}
