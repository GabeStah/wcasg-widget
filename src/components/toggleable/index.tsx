import React from 'react';
import { connect } from 'react-redux';

import { IToggleable } from 'plugins/toggleable';

import styles from './styles.scss';
import Toggleable from 'plugins/toggleable';

import PluginManager from 'classes/plugin-manager';

export interface ToggleableComponentProps {
  id: string;
  enabled: boolean;
  toggle: () => void;
}

class ToggleableComponent extends React.Component<ToggleableComponentProps> {
  public plugin: IToggleable = PluginManager.find<IToggleable>(this.props.id);

  public componentDidUpdate(prevProps: { enabled: boolean }, prevState: any) {
    if (this.props.enabled !== prevProps.enabled) {
      this.plugin.onUpdate(this.plugin, this.props);
    }
  }

  public componentWillMount() {
    // Initialize plugin
    this.plugin.onMount(this.props);
  }

  public render() {
    return (
      <div id={this.plugin.id} className={styles.container}>
        <h1>{this.plugin.title}</h1>
        <button type={'button'} onClick={this.props.toggle}>
          {this.props.enabled ? 'Disable' : 'Enable'}
        </button>
      </div>
    );
  }
}

export default connect(
  Toggleable.mapStateToProps,
  Toggleable.mapDispatchToProps
)(ToggleableComponent);
