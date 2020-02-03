import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import SelectOptionComponent from 'components/select/select-options';
import config from 'config';
import React from 'react';

const SelectComponent = ({
  // state,
  actions,
  plugin,
  onChangeHandler,
  options
}: {
  // state: any;
  actions: any;
  plugin: any;
  onChangeHandler: any;
  options: any;
}) => (
  <FormControl>
    <InputLabel htmlFor={`${plugin.id}-select-label`}>
      {plugin.title}
    </InputLabel>
    <Select
      id={`${config.widgetId}-${plugin.id}-select`}
      name={`${plugin.id}-select`}
      onChange={onChangeHandler}
    >
      {options.map((option: any) => (
        <SelectOptionComponent
          actions={actions}
          plugin={plugin}
          item={option}
        />
      ))}
    </Select>
  </FormControl>
);

export default SelectComponent;
