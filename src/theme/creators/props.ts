import { ComponentsProps } from '@material-ui/core/styles/props';

export function createComponentProps(): ComponentsProps {
  return {
    // Name of the component
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application
      tabIndex: -4
    },
    MuiSwitch: {
      inputProps: {
        tabIndex: -4
      },
      tabIndex: -4
    },
    MuiButton: {
      tabIndex: -4
    }
  };
}
