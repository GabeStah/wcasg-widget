import $ from 'cash-dom';
import { h, Component } from 'preact';
import React from 'preact/compat';
import config from '../../../config';

const plugin = config.plugins.fontSize;

export default class FontSize extends Component {
  state = {
    base: {
      // Get original font numeric font size
      size: parseInt(
        $('body')
          .css('font-size')
          .toString()
          .replace('px', '')
      )
    },
    ...plugin.defaults
  };

  componentDidUpdate(previousProps, previousState, snapshot) {
    const currentSize = $('body').css('font-size');
    console.log(`componentDidUpdate, currentSize: ${currentSize}`);
    console.log(`updating to: ${this.state.size}`);
    this.updateUI();
    const newSize = $('body').css('font-size');
    console.log(`componentDidUpdate, newSize: ${newSize}`);
  }

  componentWillMount() {
    const currentSize = $('body').css('font-size');
    console.log(`currentSize: ${currentSize}`);
  }

  /**
   * Decrement font size, or set to minimum
   */
  decrement = () => {
    const adjustment = this.state.adjustment - this.state.increment;

    this.setState({
      adjustment:
        adjustment < this.state.minimum ? this.state.minimum : adjustment
    });

    this.setState({
      size: this.state.base.size * this.state.adjustment
    });
  };

  /**
   * Increment font size, or set to maximum
   */
  increment = () => {
    const adjustment = this.state.adjustment + this.state.increment;

    this.setState({
      adjustment:
        adjustment > this.state.maximum ? this.state.maximum : adjustment
    });

    this.setState({
      size: this.state.base.size * this.state.adjustment
    });
  };

  updateUI = () => {
    // Use updated size, otherwise base size.
    const size = this.state.size ? this.state.size : this.state.base.size;
    $('body').css('font-size', `${size}px`);
  };

  render(props) {
    return (
      <div>
        <h1>{props.name}</h1>
        <p>Current Adjustment %: {this.state.adjustment}</p>
        <p>Current Size: {this.state.size}</p>
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
