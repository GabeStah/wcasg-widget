import { fade } from '@material-ui/core/styles/colorManipulator';
import createPalette, {
  PaletteOptions
} from '@material-ui/core/styles/createPalette';

const colors = {
  background: '#fff',
  backgroundEnabled: '#FAFAFA',
  border: fade('#999999', 0.5),
  primary: '#297FCA',
  primaryDark: '#184570',
  primaryLight: '#e8f6ff',
  switchMain: '#fff',
  textSecondary: '#fff'
};

const palette: PaletteOptions = {
  background: {
    default: colors.background,
    paper: colors.background
  },
  backgroundEnabled: {
    main: colors.backgroundEnabled
  },
  border: {
    main: colors.border
  },
  common: {
    white: '#fff',
    black: '#000'
  },
  divider: colors.border,
  focused: {
    main: '#14f176',
    dark: '#14f176'
  },
  primary: {
    contrastText: colors.background,
    dark: colors.primaryDark,
    main: colors.primary,
    light: colors.primaryLight
  },
  secondary: {
    contrastText: colors.background,
    dark: '#a31545',
    main: '#e91e63',
    light: '#ed4b82'
  },
  switch: {
    main: colors.switchMain
  },
  text: {
    primary: colors.primary,
    secondary: colors.textSecondary
  }
};

export default createPalette(palette);
