// @ts-ignore
import IconBadge from 'assets/svg-minified/plugins/badge.svg';
// @ts-ignore
import IconBook from 'assets/svg-minified/plugins/book.svg';
// @ts-ignore
import IconContrast from 'assets/svg-minified/plugins/contrast.svg';
// @ts-ignore
import IconCursor from 'assets/svg-minified/plugins/cursor.svg';
// @ts-ignore
import IconDisableImages from 'assets/svg-minified/plugins/disable-images.svg';
// @ts-ignore
import IconEmphasizeHover from 'assets/svg-minified/plugins/emphasize-hover.svg';
// @ts-ignore
import IconEmphasizeLinks from 'assets/svg-minified/plugins/emphasize-links.svg';
// @ts-ignore
import IconEmphasizeTitles from 'assets/svg-minified/plugins/emphasize-titles.svg';
// @ts-ignore
import IconEmphasizeTitlesAlt from 'assets/svg-minified/plugins/emphasize-titles-alt.svg';
// @ts-ignore
import IconFontSize from 'assets/svg-minified/plugins/font-size.svg';
// @ts-ignore
import IconFontSpacing from 'assets/svg-minified/plugins/font-spacing.svg';
// @ts-ignore
import IconFontType from 'assets/svg-minified/plugins/font-type.svg';
// @ts-ignore
import IconInvertColors from 'assets/svg-minified/plugins/invert-colors.svg';
// @ts-ignore
import IconKeyboardNavigation from 'assets/svg-minified/plugins/keyboard-nav.svg';
// @ts-ignore
import IconMute from 'assets/svg-minified/plugins/mute.svg';
// @ts-ignore
import IconNote from 'assets/svg-minified/plugins/note.svg';
// @ts-ignore
import IconOnscreenKeyboard from 'assets/svg-minified/plugins/onscreen-keyboard.svg';
// @ts-ignore
import IconPauseAnimations from 'assets/svg-minified/plugins/pause-animations.svg';
// @ts-ignore
import IconReset from 'assets/svg-minified/plugins/reset.svg';
// @ts-ignore
import IconTextToSpeech from 'assets/svg-minified/plugins/text-to-speech.svg';
// @ts-ignore
import IconTooltip from 'assets/svg-minified/plugins/tooltip.svg';


export enum Ids {
  BlackAndYellow = 'black-and-yellow',
  DarkContrast = 'dark-contrast',
  EmphasizeHover = 'emphasize-hover',
  EmphasizeTitles = 'emphasize-titles',
  FontSize = 'font-size',
  Grayscale = 'grayscale',
  HideImages = 'hide-images',
  HighlightForms = 'highlight-forms',
  HighlightLinks = 'highlight-links',
  InvertColors = 'invert-colors',
  KeyboardNavigation = 'keyboard-navigation',
  LargeCursor = 'large-cursor',
  LargeIcons = 'large-icons',
  LetterSpacing = 'text-spacing',
  LightContrast = 'light-contrast',
  MuteAudio = 'mute-audio',
  PageNavigation = 'page-navigation',
  ReadableFonts = 'readable-fonts',
  StopAnimations = 'stop-animations',
  TextToSpeech = 'text-to-speech',
  Tooltip = 'tooltip',
  VirtualKeyboard = 'virtual-keyboard'
}

export const Icons = {
  [Ids.BlackAndYellow.toString()]: IconContrast,
  [Ids.DarkContrast.toString()]: IconContrast,
  [Ids.EmphasizeHover.toString()]: IconEmphasizeHover,
  [Ids.EmphasizeTitles.toString()]: IconEmphasizeTitles,
  [Ids.FontSize.toString()]: IconFontSize,
  [Ids.Grayscale.toString()]: IconEmphasizeTitlesAlt,
  [Ids.HideImages.toString()]: IconDisableImages,
  [Ids.HighlightForms.toString()]: IconNote,
  [Ids.HighlightLinks.toString()]: IconEmphasizeLinks,
  [Ids.InvertColors.toString()]: IconInvertColors,
  [Ids.KeyboardNavigation.toString()]: IconKeyboardNavigation,
  [Ids.LargeCursor.toString()]: IconCursor,
  [Ids.LargeIcons.toString()]: IconBadge,
  [Ids.LetterSpacing.toString()]: IconFontSpacing,
  [Ids.LightContrast.toString()]: IconContrast,
  [Ids.MuteAudio.toString()]: IconMute,
  [Ids.PageNavigation.toString()]: IconBook,
  [Ids.ReadableFonts.toString()]: IconFontType,
  [Ids.StopAnimations.toString()]: IconPauseAnimations,
  [Ids.TextToSpeech.toString()]: IconTextToSpeech,
  [Ids.Tooltip.toString()]: IconTooltip,
  [Ids.VirtualKeyboard.toString()]: IconOnscreenKeyboard
};
