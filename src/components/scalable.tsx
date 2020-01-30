import React from 'react';

export const Scalable = ({
  plugin,
  actions
}: {
  plugin: any;
  actions: any;
}) => {
  return (
    <>
      <p>{plugin.scalingFactor}</p>
      <button onClick={actions.decrement(plugin.id)}>-</button>
      <button onClick={actions.increment(plugin.id)}>+</button>
    </>
  );
};
