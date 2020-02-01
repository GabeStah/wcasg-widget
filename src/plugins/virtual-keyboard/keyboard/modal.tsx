import { KeyboardLayoutENUS } from 'classes/keyboard/key';
import Keyboard from 'plugins/virtual-keyboard/keyboard/keyboard';
import React from 'react';
import styles from '../styles.scss';

const Modal = ({ isVisible }: { isVisible: boolean }) => (
  <div
    className={`${styles['wcasg-ada-app-keyboard-modal']} ${
      isVisible ? styles.visible : styles.hidden
    }`}
  >
    <Keyboard layout={KeyboardLayoutENUS} />
  </div>
);

export default Modal;
