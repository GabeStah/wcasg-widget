import config from 'config';
import React from 'react';

const SelectComponent = ({
  // state,
  data,
  actions,
  plugin,
  onChangeHandler,
  options
}: {
  // state: any;
  data: any;
  actions: any;
  plugin: any;
  onChangeHandler: any;
  options: any;
}) => (
  <select
    id={`${config.widgetId}-${plugin.id}-select`}
    name={`${plugin.id}-select`}
    size={1}
    onChange={onChangeHandler}
  >
    {options}
  </select>
);

export default SelectComponent;
