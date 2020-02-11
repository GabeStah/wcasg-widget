import {
  PaletteColor,
  PaletteColorOptions
} from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    backgroundEnabled: PaletteColor;
    border: PaletteColor;
    focused: PaletteColor;
    switch: PaletteColor;
  }

  interface PaletteOptions {
    backgroundEnabled: PaletteColorOptions;
    border: PaletteColorOptions;
    focused: PaletteColorOptions;
    switch: PaletteColorOptions;
  }
}
