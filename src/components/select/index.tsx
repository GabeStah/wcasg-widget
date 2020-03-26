import {
  PluginOption,
  PluginSelectComponentParams,
  SelectOption
} from '@/enum';
import { areEqual } from '@/utility/number';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import NativeSelect from '@material-ui/core/NativeSelect';
import SelectOptionComponent from 'components/select/select-options';
import config from 'config';
import React, { useEffect } from 'react';
import { Selectors } from 'state/redux/selectors';
import map from 'lodash/map';

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
          console.log(`enabling: ${plugin.id}`);
          actions.enable(plugin.id);
        }
      } else {
        // Only change state if necessary
        if (statePlugin.enabled) {
          console.log(`disabling: ${plugin.id}`);
          actions.disable(plugin.id);
        }
      }
    }
  };

  // Toggle based on factor
  useEffect(() => handleToggle(), [selectedOption]);

  const getSelectOptions = (opts: SelectOption[] | PluginOption[]) => {
    const selectOptionComponents: any[] = [];
    opts.forEach((option: PluginOption | SelectOption) => {
      if (!('isGroup' in option && option.isGroup)) {
        selectOptionComponents.push(
          <SelectOptionComponent
            actions={actions}
            plugin={plugin}
            isGroup={
              'isGroup' in option && option.isGroup ? option.isGroup : false
            }
            item={option}
            selected={
              selectedOption !== undefined &&
              selectedOption.value === option.value
            }
          />
        );
      }
    });
    return selectOptionComponents;
  };

  return (
    <FormControl>
      {showLabel && (
        <InputLabel htmlFor={`${plugin.id}-select-label`}>{name}</InputLabel>
      )}
      <NativeSelect
        id={`${config.widgetId}-${plugin.id}-select`}
        name={`${plugin.id}-select`}
        inputProps={{
          'aria-label': name
            ? name
            : plugin.optionName
            ? plugin.optionName
            : plugin.title
        }}
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
          {name ? name : plugin.optionName ? plugin.optionName : plugin.title}
          {/*-- {name ? name.toUpperCase() : plugin.title} --*/}
        </option>
        {getSelectOptions(options)}
        })}
      </NativeSelect>
    </FormControl>
  );
};

export default SelectComponent;
