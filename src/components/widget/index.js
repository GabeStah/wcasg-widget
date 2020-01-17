import { h, Component } from 'preact';
import styled from 'styled-components';
import React from 'preact/compat';
import FontSize from '../font-size';
import config from '../../../config';

const Modal = styled.div`
  background-color: hsla(0, 0%, 100%, 0.9);
  position: absolute;
  top: 5%;
  right: 5%;
  bottom: 5%;
  left: 5%;
`;

const Header = styled.h3``;

const InnerContainer = styled.div``;

export default class Widget extends Component {
  render(props) {
    return (
      <Modal>
        <Header>Widget Header</Header>
        <InnerContainer>
          <FontSize name={config.plugins.fontSize.name} />
        </InnerContainer>
      </Modal>
    );
  }
}
