import { h, Component } from 'preact';
import styled from 'styled-components';
import React from 'preact/compat';

const Container = styled.div``;

const Name = styled.h3`
  font-size: 20px;
`;

const InnerContainer = styled.div``;

export default class Plugin extends Component {
  render(props) {
    return (
      <Container>
        <Name>{props.name}</Name>
        <InnerContainer>{/*{props.}*/}</InnerContainer>
      </Container>
    );
  }
}
