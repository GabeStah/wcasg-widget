import createPalette, {
  PaletteOptions
} from '@material-ui/core/styles/createPalette';

const colors = {
  background: '#000',
  backgroundEnabled: '#252525',
  border: '#c1b408',
  primary: '#fffb11',
  primaryLight: '#585507',
  primaryDark: '#fffcd7',
  switchMain: '#c1b408',
  textSecondary: '#252525'
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
