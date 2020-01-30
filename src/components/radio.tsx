import React from 'react';

export const Radio = ({
  // state,
  data,
  actions,
  plugin
}: {
  // state: any;
  data: any;
  actions: any;
  plugin: any;
}) => (
  <div>
    {data.map((datum: any) => (
      <>
        <input
          type='radio'
          id={datum.id}
          name={datum.name}
          value={datum.value}
          onChange={() => actions.selectOption(plugin.id, datum.id)}
        />
        <label htmlFor={datum.id}>{datum.text}</label>
      </>
    ))}
  </div>
);
