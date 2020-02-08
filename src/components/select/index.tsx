import { PluginSelectComponentParams } from '@/enum';
import { areEqual } from '@/utility/number';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import NativeSelect from '@material-ui/core/NativeSelect';
import SelectOptionComponent from 'components/select/select-options';
import config from 'config';
import React, { useEffect } from 'react';
import { Selectors } from 'state/redux/selectors';

const SelectComponent = ({
  actions,
  autoToggle = true,
  name,
  onChangeHandler,
  options,
  plugin,
  showLabel = false,
  state
}: PluginSelectComponentParams) => {
  const statePlugin = new Selectors(state).getPlugin(plugin.id);
  const selectedOption = new Selectors(state).getPluginSelectedOption(
    plugin.id
  );

  /**
   * Toggle based on diff from baseFactor
   */
  const handleToggle = () => {
    if (autoToggle) {
      if (selectedOption) {
        // Only change state if necessary
        if (!statePlugin.enabled) {
          actions.enable(plugin.id);
        }
      } else {
        // Only change state if necessary
        if (statePlugin.enabled) {
          actions.disable(plugin.id);
        }
      }
    }
  };

  // Toggle based on factor
  useEffect(() => handleToggle(), [selectedOption]);

  return (
    <FormControl>
      {showLabel && (
        <InputLabel htmlFor={`${plugin.id}-select-label`}>{name}</InputLabel>
      )}
      <NativeSelect
        id={`${config.widgetId}-${plugin.id}-select`}
        name={`${plugin.id}-select`}
        onChange={e => {
          if (onChangeHandler) {
            onChangeHandler(e);
          } else {
            actions.selectOption(plugin.id, e.target.value);
          }
        }}
      >
        <option
          id={'-1'}
          key={-1}
          aria-label={`${name}`}
          value={undefined}
          selected={!statePlugin.enabled}
        >
          {name
            ? name.toUpperCase()
            : plugin.optionName
            ? plugin.optionName.toUpperCase()
            : plugin.title}
          {/*-- {name ? name.toUpperCase() : plugin.title} --*/}
        </option>
        {options.map((option: any) => (
          <SelectOptionComponent
            actions={actions}
            plugin={plugin}
            item={option}
            selected={
              selectedOption !== undefined &&
              selectedOption.value === option.value
            }
          />
        ))}
      </NativeSelect>
    </FormControl>
  );
};

// export interface PluginOption {
//   id: number;
//   name: string;
//   value: string | number | boolean;
//   text: string;
//   selected?: boolean;
// }

export default SelectComponent;
