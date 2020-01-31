import React from 'react';
import styles from '../styles.scss';

const Key = ({ letter }: { letter: string }) => (
  <button
    className={styles.key}
    onClick={() =>
      document.dispatchEvent(new KeyboardEvent('keydown', { key: letter }))
    }
  >
    {letter.toUpperCase()}
  </button>
);

export default Key;
