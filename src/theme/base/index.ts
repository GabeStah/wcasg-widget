/* tslint:disable:object-literal-key-quotes */
import { createMuiTheme } from '@material-ui/core';
import {
  createComponentProps,
  createOverrides,
  createTypography
} from 'theme/creators';
import palette from './palette';

const theme = createMuiTheme({
  palette,
  typography: createTypography(palette),
  zIndex: {
    appBar: 1200,
    modal: 9998,
    drawer: 1100
  },
  overrides: createOverrides(palette),
  props: createComponentProps()
});

export default theme;
