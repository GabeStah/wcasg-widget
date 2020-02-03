import MenuItem from '@material-ui/core/MenuItem';
import config from 'config';
import React from 'react';

const SelectOptionComponent = ({
  // state,
  actions,
  plugin,
  item
}: {
  // state: any;
  actions: any;
  plugin: any;
  item: any;
}) => (
  <MenuItem
    id={`${plugin.id}-${item.value}-option`}
    key={item.value}
    aria-label={`${item.text}`}
    value={item.value}
  >
    {item.text}
  </MenuItem>
);

export default SelectOptionComponent;
