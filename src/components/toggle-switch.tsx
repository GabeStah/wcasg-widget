/* tslint:disable:object-literal-key-quotes */
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import React from 'react';

export const ToggleSwitch = ({
  data,
  actions,
  plugin,
  children
}: {
  data?: any;
  actions: any;
  plugin: any;
  children?: any;
}) => {
  const value = `${plugin.enabled ? 'Disable' : 'Enable'} ${plugin.title}`;

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
    // <Button
    //   onClick={() => {
    //     if (plugin.enabled) {
    //       actions.disable(plugin.id);
    //     } else {
    //       actions.enable(plugin.id);
    //     }
    //   }}
    //
    //   role={'button'}
    //   variant={'contained'}
    //   color={plugin.enabled ? 'primary' : 'secondary'}
    // >
    //   {children ? children : plugin.enabled ? 'Disable' : 'Enable'}
    // </Button>
  );
};

export default ToggleSwitch;
