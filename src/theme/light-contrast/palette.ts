import createPalette, {
  PaletteOptions
} from '@material-ui/core/styles/createPalette';

const colors = {
  background: '#f8f8f8',
  backgroundEnabled: '#dfdfdf',
  border: '#9b9b9b',
  primary: '#323232',
  primaryLight: '#b1b1b1',
  primaryDark: '#636363',
  switchMain: '#3c3c3c',
  textSecondary: '#d8d8d8'
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
    main: '#fffb11',
    dark: '#c1b408'
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
