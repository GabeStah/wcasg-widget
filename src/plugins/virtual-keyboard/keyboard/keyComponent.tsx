import Dom from '@/utility/dom';
import { Key, KeyboardLayoutKeySize } from 'classes/keyboard/key';
import { Ids } from 'plugins/data';
import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { Selectors } from 'state/redux/selectors';
import styles from '../styles.scss';
import keyDown = Simulate.keyDown;

const KeyComponent = ({ instance }: { instance: Key }) => {
  const buttonClasses = [styles.key];
  let buttonStyle;
  switch (instance.size) {
    case KeyboardLayoutKeySize.Normal:
      buttonClasses.push(styles.Normal);
      break;
    case KeyboardLayoutKeySize.Large:
      buttonClasses.push(styles.Large);
      break;
    case KeyboardLayoutKeySize.XLarge:
      buttonClasses.push(styles.XXLarge);
      break;
    case KeyboardLayoutKeySize.XXLarge:
      buttonClasses.push(styles.XXLarge);
      break;
    default:
      // Number
      buttonStyle = {
        fontSize: `${instance.size}px`
      };
  }
  return (
    <a
      className={buttonClasses.join(' ')}
      style={buttonStyle}
      aria-label={instance.toString()}
      aria-roledescription={'button'}
      role={'button'}
      onClick={e => {
        e.preventDefault();

        const focusedTextNode = Dom.isFocusedNodeInputField();
        if (focusedTextNode) {
          if (instance.action) {
            // Invoke action and pass element
            instance.action(focusedTextNode);
          } else {
            // Cannot simulate character insertion as if user pressed key, so manually update value.
            // @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Auto-repeat_handling_prior_to_Gecko_5.0
            Dom.insertTextIntoInputElement({
              element: focusedTextNode,
              value: instance.insertValued
                ? instance.insertValued
                : instance.toString()
            });
          }
        }

        // Find focused element
        return document.dispatchEvent(
          new KeyboardEvent('keydown', { key: instance.toString() })
        );
      }}
      onMouseDown={e => e.preventDefault()}
    >
      <span>{instance.toString()}</span>
    </a>
  );
};

export default KeyComponent;
