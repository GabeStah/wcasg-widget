import { h, Component } from 'preact';
import React from 'preact/compat';
import config from '../../../config';
import { tags } from './tags';

const plugin = config.plugins.fontSize;

export default class FontSize extends Component {
  state = {
    nodes: document.querySelectorAll(tags.join(', ')),
    ...plugin.defaults
  };

  get dataAttributeName() {
    return `data-${config.widgetId}-original-font-size`;
  }

  componentWillMount() {
    this.setDataAttributes();
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
      this.setProperties
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
      this.setProperties
    );
  };

  /**
   * Assign data attributes to retain original font-size.
   */
  setDataAttributes = () => {
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
  setProperties = () => {
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
      <div>
        <h1>{props.name}</h1>
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
