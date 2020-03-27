/* tslint:disable:object-literal-key-quotes */
import { PluginProperty } from '@/types';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import React from 'react';
import { Selectors } from 'state/redux/selectors';
import { State } from 'state/redux/state';

export const ToggleSwitch = ({
  children,
  data,
  actions,
  plugin,
  property,
  state
}: {
  children?: any;
  data?: any;
  actions: any;
  plugin: any;
  property?: PluginProperty;
  state: State;
}) => {
  const value = `${plugin.enabled ? 'Disable' : 'Enable'} ${plugin.title}`;

  if (property) {
    const options = new Selectors(state).getPluginPropertyOptions({
      plugin: plugin.id,
      property
    });
    if (options && options[0]) {
      const option = options[0];
      return (
        <Switch
          // aria-label={value}
          // aria-roledescription={'button'}
          checked={!!option.value}
          color={'primary'}
          inputProps={{ 'aria-label': option.value.toString(), tabIndex: 0 }}
          onChange={() => {
            if (option.value) {
              actions.setPropertyOption({
                id: plugin.id,
                propertyId: property.id,
                optionId: option.id,
                value: false
              });
            } else {
              actions.setPropertyOption({
                id: plugin.id,
                propertyId: property.id,
                optionId: option.id,
                value: true
              });
            }
          }}
          tabIndex={0}
          value={option.value}
        />
      );
    } else {
      return <></>;
    }
  } else {
    return (
      <Switch
        // aria-label={value}
        // aria-roledescription={'button'}
        checked={plugin.enabled}
        color={'primary'}
        inputProps={{ 'aria-label': value, tabIndex: 0 }}
        onChange={() => {
          if (plugin.enabled) {
            actions.disable(plugin.id);
          } else {
            actions.enable(plugin.id);
          }
        }}
        tabIndex={undefined}
        value={value}
      />
    );
  }
};

export default ToggleSwitch;
