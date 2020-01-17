import { h, Component } from 'preact';
import './style.css';

export default class App extends Component {
  render(props) {
    return (
      <div className={'test'}>
        <h1 style={{ color: props.color }}>Hello, World!</h1>
      </div>
    );
  }
}
