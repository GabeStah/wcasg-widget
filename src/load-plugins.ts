import PluginManager from 'classes/plugin/manager';

import Contrast from 'plugins/contrast/plugin';
import EmphasizeHover from 'plugins/emphasize-hover/plugin';
import EmphasizeTitles from 'plugins/emphasize-titles/plugin';
import FontSize from 'plugins/font-size/plugin';
import HideImages from 'plugins/hide-images/plugin';
import HighlightForms from 'plugins/highlight-forms/plugin';
import HighlightLinks from 'plugins/highlight-links/plugin';
import KeyboardNavigation from 'plugins/keyboard-navigation/plugin';
import LargeCursor from 'plugins/large-cursor/plugin';
import LargeIcons from 'plugins/large-icons/plugin';
import LetterSpacing from 'plugins/letter-spacing/plugin';
import MuteAudio from 'plugins/mute-audio/plugin';
import PageNavigation from 'plugins/page-navigation/plugin';
import ReadableFonts from 'plugins/readable-fonts/plugin';
import StopAnimations from 'plugins/stop-animations/plugin';
import TextToSpeech from 'plugins/text-to-speech/plugin';
import Tooltip from 'plugins/tooltip/plugin';
import VirtualKeyboard from 'plugins/virtual-keyboard/plugin';

export const initialPlugins = [
  Contrast,
  EmphasizeHover,
  EmphasizeTitles,
  FontSize,
  HideImages,
  HighlightForms,
  HighlightLinks,
  KeyboardNavigation,
  LargeCursor,
  LargeIcons,
  LetterSpacing,
  MuteAudio,
  PageNavigation,
  ReadableFonts,
  StopAnimations,
  TextToSpeech,
  Tooltip,
  VirtualKeyboard
];

PluginManager.getInstance().add(initialPlugins);
