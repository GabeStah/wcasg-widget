import { ComponentsProps } from '@material-ui/core/styles/props';

export function createComponentProps(): ComponentsProps {
  return {
    // Name of the component
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application
      tabIndex: -4
    },
    MuiButton: {
      tabIndex: -4
    },
    MuiListItem: {
      style: {
        paddingBottom: '0px',
        paddingTop: '0px'
      }
    },
    MuiListItemText: {
      primaryTypographyProps: {
        style: {
          fontWeight: 'bold'
        },
        variant: 'h3'
      },
      secondaryTypographyProps: {
        color: 'primary'
      }
    },
    MuiPopover: {
      PaperProps: {
        variant: 'elevation'
      }
    },
    MuiSwitch: {
      inputProps: {
        tabIndex: -4
      },
      tabIndex: -4
    },
  };
}
