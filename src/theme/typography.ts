import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import palette from './palette';

interface TypographyDefaults {
  fontSize: number;
}

export const typographyDefaults: TypographyDefaults = {
  fontSize: 12
};

const typography: TypographyOptions = {
  h1: {
    color: '#fff',
    fontWeight: 500,
    fontSize: typographyDefaults.fontSize * 1.6,
    letterSpacing: '-0.24px',
    lineHeight: '40px',
    textTransform: 'uppercase'
  },
  h2: {
    color: palette.text?.primary,
    fontWeight: 500,
    fontSize: typographyDefaults.fontSize * 1.4,
    letterSpacing: '-0.24px',
    lineHeight: '32px',
    textTransform: 'uppercase'
  },
  h3: {
    color: palette.text?.primary,
    fontWeight: 500,
    fontSize: typographyDefaults.fontSize * 1.2,
    letterSpacing: '-0.06px',
    lineHeight: '28px',
    textTransform: 'uppercase'
  },
  h4: {
    color: palette.text?.primary,
    fontWeight: 500,
    fontSize: typographyDefaults.fontSize * 1.1,
    letterSpacing: '-0.06px',
    lineHeight: '24px'
  },
  h5: {
    color: palette.text?.primary,
    fontWeight: 500,
    fontSize: typographyDefaults.fontSize,
    letterSpacing: '-0.05px',
    lineHeight: '20px'
  },
  h6: {
    color: palette.text?.primary,
    fontWeight: 500,
    fontSize: typographyDefaults.fontSize,
    letterSpacing: '-0.05px',
    lineHeight: '20px'
  },
  subtitle1: {
    color: palette.text?.primary,
    fontSize: typographyDefaults.fontSize * 1.2,
    letterSpacing: '-0.05px',
    lineHeight: '25px'
  },
  subtitle2: {
    color: palette.text?.secondary,
    fontWeight: 400,
    fontSize: typographyDefaults.fontSize * 1.1,
    letterSpacing: '-0.05px',
    lineHeight: '21px'
  },
  body1: {
    color: palette.text?.primary,
    fontSize: typographyDefaults.fontSize,
    letterSpacing: '-0.05px',
    lineHeight: '21px',
    textTransform: 'uppercase'
  },
  body2: {
    color: palette.text?.secondary,
    fontSize: typographyDefaults.fontSize * 0.9,
    letterSpacing: '-0.04px',
    lineHeight: '18px'
  },
  button: {
    color: palette.text?.primary,
    fontSize: typographyDefaults.fontSize,
    textTransform: 'uppercase'
  },
  caption: {
    color: palette.text?.secondary,
    fontSize: typographyDefaults.fontSize * 0.9,
    letterSpacing: '0.33px',
    lineHeight: '13px'
  },
  overline: {
    color: palette.text?.secondary,
    fontSize: typographyDefaults.fontSize ,
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px',
    textTransform: 'uppercase'
  }
};

export default typography;
