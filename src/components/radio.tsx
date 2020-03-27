import { Plugin, PluginProperty, PluginPropertyOption } from '@/types';
import { Theme } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import { State } from 'state/redux/state';

export const Component = ({
  actions,
  onChangeHandler,
  plugin,
  property,
  state,
  theme,
  title
}: {
  actions: any;
  onChangeHandler?: any;
  plugin: Plugin;
  property: PluginProperty;
  state: State;
  theme: Theme;
  title?: string;
}) => {
  const getOptions = (options: PluginPropertyOption[]) => {
    const selectOptionComponents: any[] = [];
    options.forEach((option: PluginPropertyOption) => {
      selectOptionComponents.push(
        <FormControlLabel
          id={`${plugin.id}-${option.value}-option`}
          control={<Radio />}
          checked={option.selected}
          name={option.text.toString()}
          label={option.text ?? option.value}
          value={option.value}
          aria-checked={option.selected ? 'true' : 'false'}
          aria-label={`${plugin.title} Option: ${option.text}`}
          tabIndex={option.selected ? 0 : -1}
        />
      );
    });
    return selectOptionComponents;
  };

  return (
    <>
      <FormLabel component='legend'>{title ?? plugin.title}</FormLabel>
      <RadioGroup
        role={'radiogroup'}
        aria-label={`${title ?? plugin.title} Options`}
        row={true}
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
        {property.options && getOptions(property.options)}
      </RadioGroup>
    </>
  );
};

export default Component;
