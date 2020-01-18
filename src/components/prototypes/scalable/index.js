import { h, Component } from 'preact';
import config from '../../../../config';
import styles from './styles.scss';

export default class ScalablePlugin extends Component {
  state = {
    nodes: document.querySelectorAll(this.props.nodeTypes.join(', ')),
    ...this.props.defaults
  };

  get dataAttributeName() {
    return `data-${config.widgetId}-original-${this.props.id}`;
  }

  componentWillMount() {
    this.updateDataAttributes();
    this.update();
  }

  /**
   * Decrement or set to minimum
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
   * Increment or set to maximum
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
   * Assign data attributes to retain original values.
   */
  updateDataAttributes = () => {
    // Add attribute
    if (this.state.nodes && this.state.nodes.length > 0) {
      this.state.nodes.forEach(node => {
        const prop = node.style.getPropertyValue(this.props.propertyName);
        // Get computed value if property not explicitly assigned
        const value =
          prop && prop !== ''
            ? prop
            : window
                .getComputedStyle(node)
                .getPropertyValue(this.props.propertyName);
        node.setAttribute(this.dataAttributeName, value);
      });
    }
  };

  /**
   * Assign updated property to all selected nodes.
   * Calculated based on node's original and current adjustment %.
   */
  update = () => {
    if (this.state.nodes && this.state.nodes.length > 0) {
      this.state.nodes.forEach(node => {
        const original = node.getAttribute(this.dataAttributeName);
        // Set property based on adjustment % of original
        node.style.setProperty(
          this.props.propertyName,
          `${parseInt(original) * this.state.adjustment}${this.props
            .propertyUnit || 'px'}`
        );
      });
    }
  };

  render() {
    return (
      <div id={this.props.id} className={styles.container}>
        <h1>{this.props.title}</h1>
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
