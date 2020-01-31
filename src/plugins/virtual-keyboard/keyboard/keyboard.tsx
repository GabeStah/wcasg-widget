import React from 'react';
import Key from './key';
import styles from '../styles.scss';

const Keyboard = () => (
  <div className={styles.keyboard}>
    <div className={styles['key-row']}>
      <Key letter='q' />
      <Key letter='w' />
      <Key letter='e' />
      <Key letter='r' />
      <Key letter='t' />
      <Key letter='y' />
      <Key letter='u' />
      <Key letter='i' />
      <Key letter='o' />
      <Key letter='p' />
    </div>
    <div className={styles['key-row']}>
      <Key letter='a' />
      <Key letter='s' />
      <Key letter='d' />
      <Key letter='f' />
      <Key letter='g' />
      <Key letter='h' />
      <Key letter='j' />
      <Key letter='k' />
      <Key letter='l' />
    </div>
    <div className={styles['key-row']}>
      <Key letter='z' />
      <Key letter='x' />
      <Key letter='c' />
      <Key letter='v' />
      <Key letter='b' />
      <Key letter='n' />
      <Key letter='m' />
    </div>
  </div>
);

export default Keyboard;
