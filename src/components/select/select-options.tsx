import MenuItem from '@material-ui/core/MenuItem';
import config from 'config';
import React from 'react';

const SelectOptionComponent = ({
  // state,
  actions,
  isGroup = false,
  isNative = true,
  plugin,
  item,
  selected
}: {
  // state: any;
  actions: any;
  isGroup?: boolean;
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
    // TODO: Fix grouping
    if (!isGroup) {
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
    }
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
