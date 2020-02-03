import Button from '@material-ui/core/Button';
import React from 'react';

export const ToggleButton = ({
  data,
  actions,
  plugin,
  children
}: {
  data?: any;
  actions: any;
  plugin: any;
  children?: any;
}) => (
  <Button
    onClick={() => {
      if (plugin.enabled) {
        actions.disable(plugin.id);
      } else {
        actions.enable(plugin.id);
      }
    }}
    aria-label={`${plugin.enabled ? 'Disable' : 'Enable'} ${plugin.title}`}
    aria-roledescription={'button'}
    role={'button'}
    variant={'contained'}
    color={plugin.enabled ? 'primary' : 'secondary'}
  >
    {children ? children : plugin.enabled ? 'Disable' : 'Enable'}
  </Button>
);

export default ToggleButton;
