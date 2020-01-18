import { h, Component } from 'preact';
import React from 'preact/compat';
import ScalableComponent from './index';

import { createClass } from 'preact/compat/dist/compat';

export const Scalables = createClass({
  render: () => {
    const scalables = this.props.map((plugin, index) => {
      return <ScalableComponent key={plugin.id} props={plugin} />;
    });
    return { scalables };
  }
});

export default Scalables;
