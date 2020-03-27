import {
  PluginPropertyOption,
  PluginSelectComponentParams,
  SelectOption
} from '@/types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import SelectOptionComponent from 'components/select/select-options';
import config from 'config';
import React from 'react';
import { Selectors } from 'state/redux/selectors';

const SelectComponent = ({
  actions,
  name,
  onChangeHandler,
  options,
  plugin,
  property,
  showLabel = false,
  state
}: PluginSelectComponentParams) => {
  const statePlugin = new Selectors(state).getPlugin(plugin.id);
  let selectedPropertyOption: PluginPropertyOption | void;
  let selectedOption: SelectOption | void;
  if (property) {
    selectedPropertyOption = new Selectors(
      state
    ).getPluginPropertySelectedOption({
      plugin,
      property
    });
  } else if (options) {
    selectedOption = options.find((opt: SelectOption) => opt.selected);
  }

  const getSelectOptions = (
    opts: PluginPropertyOption[] | SelectOption[] | void
  ) => {
    if (!opts) return;
    const selectOptionComponents: any[] = [];
    opts.forEach(
      (option: PluginPropertyOption | SelectOption, index: number) => {
        if (!('isGroup' in option && option.isGroup)) {
          let isSelected = false;

          if (
            selectedPropertyOption &&
            selectedPropertyOption.value === option.value
          ) {
            isSelected = true;
          } else if (selectedOption && selectedOption.value === option.value) {
            isSelected = true;
          }

          selectOptionComponents.push(
            <SelectOptionComponent
              actions={actions}
              plugin={plugin}
              isGroup={
                'isGroup' in option && option.isGroup ? option.isGroup : false
              }
              item={option}
              selected={isSelected}
            />
          );
        }
      }
    );
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
          'aria-label': name ? name : property ? property.name : plugin.title
        }}
        onChange={e => {
          if (onChangeHandler) {
            onChangeHandler(e);
          } else if (property) {
            actions.selectPropertyOption(
              plugin.id,
              property.id,
              e.target.value
            );
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
          {name ? name : property ? property.name : plugin.title}
        </option>
        {getSelectOptions(property?.options ?? options)}
        })}
      </NativeSelect>
    </FormControl>
  );
};

export default SelectComponent;
