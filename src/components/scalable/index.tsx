import React from 'react';
import { connect } from 'react-redux';

import { IScalable } from 'plugins/scalable';

import styles from './styles.scss';
import Scalable from 'plugins/scalable';

import PluginManager from 'classes/plugin-manager';

export interface ScalableComponentProps {
  id: string;
  current: number;
  decrement: () => void;
  increment: () => void;
}

class ScalableComponent extends React.Component<ScalableComponentProps> {
  public plugin: IScalable = PluginManager.find<IScalable>(this.props.id);

  public componentDidUpdate(prevProps: { current: number }, prevState: any) {
    if (this.props.current !== prevProps.current) {
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
        <p>
          Current Adjustment:{' '}
          {this.plugin.displayValue(this.plugin, this.props)}
        </p>
        <button type={'button'} onClick={this.props.decrement}>
          -
        </button>
        <button type={'button'} onClick={this.props.increment}>
          +
        </button>
      </div>
    );
  }
}

export default connect(
  Scalable.mapStateToProps,
  Scalable.mapDispatchToProps
)(ScalableComponent);
