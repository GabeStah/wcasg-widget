/* tslint:disable:object-literal-key-quotes */
import { Palette } from '@material-ui/core/styles/createPalette';
import { Overrides } from '@material-ui/core/styles/overrides';
import {typographyDefaults} from 'theme/creators/typography';

export function createOverrides(palette: Palette): Overrides {
  return {
    MuiButton: {
      root: {
        minWidth: '22px',
        padding: '1px',
        '&$focused': {
          backgroundColor: `rgba(${palette.focused.dark}, 1) !important`,
          outline: `2px solid rgba(${palette.focused.dark}, 0.5) !important`,
          outlineOffset: `1px !important`
        }
      },
      outlined: {
        padding: '1px',
        margin: '7px'
      },
      outlinedPrimary: {
        '&$hover': {
          backgroundColor: palette.primary.main
        }
      },
      startIcon: {
        fill: palette.primary.main,
        marginLeft: '0px',
        marginRight: '0px',
        textAlign: 'center'
      }
    },
    MuiCard: {
      root: {
        boxSizing: 'border-box',
        minHeight: '124px',
        textAlign: 'center'
      }
    },
    MuiCardContent: {
      root: {
        padding: '12px',
        '&:last-child': {
          paddingBottom: '12px'
        }
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        '&$expanded': {
          minHeight: 'inherit'
        }
      },
      content: {
        margin: '0px',
        '&$expanded': {
          margin: '0px'
        }
      }
    },
    MuiPopover: {
      paper: {
        fontSize: typographyDefaults.fontSize * 1.5,
        padding: '4px',
      }
    },
    MuiRadio: {
      root: {
        color: palette.primary.main
      },
      colorSecondary: {
        '&$checked': {
          color: palette.primary.main
        }
      }
    },
    MuiNativeSelect: {
      icon: {
        color: palette.primary.main
      },
      select: {
        backgroundColor: palette.primary.light
      }
    },
    MuiSlider: {
      valueLabel: {
        color: palette.primary.main,
        backgroundColor: palette.primary.dark
      },
      thumb: {
        '&$hover': {
          boxShadow: 'none'
        }
      },
      thumbColorPrimary: {
        '&$hover': {
          boxShadow: 'none'
        }
      }
    },
    MuiSwitch: {
      switchBase: {
        color: palette.switch.main
      },
      track: {
        backgroundColor: palette.border.main
      }
    }
  };
}
