import React from 'react';

import config from 'config';

import ScalableComponent from 'components/scalable';
import PluginManager from 'classes/plugin-manager';
import { initialState } from '@/state';
import ToggleableComponent from 'components/toggleable';
import Toggleable from 'plugins/toggleable';
import Scalable from 'plugins/scalable';
//import plugins from 'root/plugins.config';
import styles from './styles.scss';

export default class Widget extends React.Component<{}> {
  public render() {
    return (
      <div className={styles.modal}>
        <h1>{config.widgetTitle}</h1>
        <div className={styles.modalContainer}>
          {/* TODO: Fix bug preventing direct component return ('cannot read prop 'mapStateToProps') */}
          {/*{PluginManager.plugins.map(plugin => {*/}
          {/*  return plugin.toComponent();*/}
          {/*})}*/}
          {initialState.elements.map((element: { template: any }) => {
            return element.template;
          })}
          {PluginManager.plugins.map(plugin => {
            if (plugin instanceof Scalable) {
              return <ScalableComponent id={plugin.id} />;
            } else if (plugin instanceof Toggleable) {
              return <ToggleableComponent id={plugin.id} />;
            }
          })}
        </div>
      </div>
    );
  }
}
