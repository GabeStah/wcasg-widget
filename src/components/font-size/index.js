import React from 'react';

import config from 'config';
import { tags } from './tags';
import styles from './styles.scss';

const plugin = config.plugins.fontSize;

export default class FontSize extends React.Component {
  state = {
    nodes: document.querySelectorAll(tags.join(', ')),
    ...plugin.defaults
  };

  get dataAttributeName() {
    return `data-${config.widgetId}-original-${plugin.id}`;
  }

  componentWillMount() {
    this.updateDataAttributes();
    this.update();
  }

  /**
   * Decrement font size, or set to minimum
   */
  decrement = () => {
    const diff = this.state.adjustment - this.state.increment;

    this.setState(
      {
        adjustment: diff < this.state.minimum ? this.state.minimum : diff
      },
      this.update
    );
  };

  /**
   * Increment font size, or set to maximum
   */
  increment = () => {
    const diff = this.state.adjustment + this.state.increment;

    this.setState(
      {
        adjustment: diff > this.state.maximum ? this.state.maximum : diff
      },
      this.update
    );
  };

  /**
   * Assign data attributes to retain original font-size.
   */
  updateDataAttributes = () => {
    // Add attribute
    if (this.state.nodes && this.state.nodes.length > 0) {
      this.state.nodes.forEach(node => {
        const prop = node.style.getPropertyValue('font-size');
        // Get computed value if property not explicitly assigned
        const value =
          prop && prop !== ''
            ? prop
            : window.getComputedStyle(node).getPropertyValue('font-size');
        node.setAttribute(this.dataAttributeName, value);
      });
    }
  };

  /**
   * Assign updated font-size property to all selected nodes.
   * Font-size calculated based on node's original font size and current adjustment %.
   */
  update = () => {
    if (this.state.nodes && this.state.nodes.length > 0) {
      this.state.nodes.forEach(node => {
        const original = node.getAttribute(this.dataAttributeName);
        // Set font size based on adjustment % of original
        node.style.setProperty(
          'font-size',
          `${parseInt(original) * this.state.adjustment}px`
        );
      });
    }
  };

  render(props) {
    return (
      <div id={plugin.id} className={styles.container}>
        <h1>{plugin.title}</h1>
        <p>
          Current Adjustment:{' '}
          {(parseFloat(this.state.adjustment) * 100).toFixed(0) + '%'}
        </p>
        <button type={'button'} onClick={this.decrement}>
          -
        </button>
        <button type={'button'} onClick={this.increment}>
          +
        </button>
      </div>
    );
  }
}
