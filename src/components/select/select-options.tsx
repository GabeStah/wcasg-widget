import MenuItem from '@material-ui/core/MenuItem';
import config from 'config';
import React from 'react';

const SelectOptionComponent = ({
  // state,
  actions,
  isNative = true,
  plugin,
  item,
  selected
}: {
  // state: any;
  actions: any;
  isNative?: boolean;
  plugin: any;
  item: any;
  selected?: boolean;
}) => {
  if (isNative) {
    return (
      <option
        aria-label={`${item.text}`}
        id={`${plugin.id}-${item.value}-option`}
        key={item.value}
        selected={selected}
        value={item.value}
      >
        {item.text}
      </option>
    );
  } else {
    return (
      <MenuItem
        aria-label={`${item.text}`}
        id={`${plugin.id}-${item.value}-option`}
        key={item.value}
        selected={selected}
        value={item.value}
      >
        {item.text}
      </MenuItem>
    );
  }
};

export default SelectOptionComponent;
