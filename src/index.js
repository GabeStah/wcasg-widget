import ModalComponent from './components/modal.html';
import './styles/styles.css';

const bodies = document.getElementsByTagName('body');
if (bodies.length > 0) {
  const body = bodies.item(0);
  body.appendChild(ModalComponent);
} else {
  // TODO: Add support for invalid HTML docs
}
