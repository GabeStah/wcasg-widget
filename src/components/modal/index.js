import { h, Component } from 'preact';
import styled from 'styled-components';

const Modal = styled.div`
  background-color: blue;
`;

const Container = styled.div`
  color: red;
`;

export default class App extends Component {
  render(props) {
    return (
      <Modal>
        <Container>
          <h2>Modal Title</h2>
        </Container>
      </Modal>
    );
  }
}
