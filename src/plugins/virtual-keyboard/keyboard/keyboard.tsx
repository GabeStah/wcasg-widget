import React from 'react';
import KeyComponent from './keyComponent';
import styles from '../styles.scss';

import { IKeyboardLayout, Key, KeyboardLayoutENUS } from 'classes/keyboard/key';

const Keyboard = ({ layout }: { layout: IKeyboardLayout }) => (
  <div className={styles.keyboard}>
    {layout.rows.map(row => {
      return (
        <div className={styles['key-row']}>
          {row.map((key: Key) => {
            return <KeyComponent key={key.toString()} instance={key} />;
          })}
        </div>
      );
    })}
  </div>
);

export default Keyboard;
