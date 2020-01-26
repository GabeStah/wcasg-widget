import React from 'react';
import config from 'config';
import styles from './styles.scss';
import { Plugins } from '@/state';

export default class Widget extends React.Component<{}> {
  public render() {
    return (
      <div className={styles.modal}>
        <h2>{config.widgetTitle}</h2>
        <div className={styles.modalContainer}>
          {Plugins.map((element: { template: any }) => {
            return element.template;
          })}
        </div>
      </div>
    );
  }
}
