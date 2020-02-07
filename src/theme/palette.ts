import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { fade } from '@material-ui/core/styles/colorManipulator';

export const colors = {
  background: '#fff',
  backgroundEnabled: '#FAFAFA',
  greyBorder: fade('#999999', 0.5),
  primaryBlue: '#297FCA'
};

const palette: PaletteOptions = {
  primary: {
    contrastText: '#fff',
    dark: '#1c588d',
    main: colors.primaryBlue,
    light: '#5398d4'
  },
  secondary: {
    contrastText: '#fff',
    dark: '#a31545',
    main: '#e91e63',
    light: '#ed4b82'
  },
  text: {
    primary: colors.primaryBlue,
    secondary: '#1c588d'
  },
  // success: {
  //   contrastText: white,
  //   dark: colors.green[900],
  //   main: colors.green[600],
  //   light: colors.green[400]
  // },
  // info: {
  //   contrastText: white,
  //   dark: colors.blue[900],
  //   main: colors.blue[600],
  //   light: colors.blue[400]
  // },
  // warning: {
  //   contrastText: white,
  //   dark: colors.orange[900],
  //   main: colors.orange[600],
  //   light: colors.orange[400]
  // },
  // error: {
  //   contrastText: white,
  //   dark: colors.red[900],
  //   main: colors.red[600],
  //   light: colors.red[400]
  // },
  background: {
    default: colors.background,
    paper: '#fff'
  },
  divider: colors.greyBorder
};

export default palette;
