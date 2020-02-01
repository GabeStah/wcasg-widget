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
  <div role={'radiogroup'} aria-label={`${plugin.title} Options`}>
    {data.map((datum: any) => (
      <>
        <input
          type='radio'
          id={datum.id}
          name={datum.name}
          value={datum.value}
          aria-checked={datum.selected ? 'true' : 'false'}
          aria-label={`${plugin.title} Option: ${datum.text}`}
          tabIndex={datum.selected ? 0 : -1}
          onChange={() => actions.selectOption(plugin.id, datum.id)}
        />
        <label id={`${datum.id}-label`} htmlFor={datum.id}>
          {datum.text}
        </label>
      </>
    ))}
  </div>
);
