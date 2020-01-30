import { Plugin } from '@/enum';
import { pluginEmphasizeTitles } from '@/plugins-new/emphasize-titles/plugin';
import { pluginHideImages } from '@/plugins-new/hide-images';
import { pluginHighlightLinks } from '@/plugins-new/highlight-links/plugin';
import { pluginKeyboardNavigation } from '@/plugins-new/keyboard-navigation/plugin';
import { pluginTextToSpeech } from '@/plugins-new/text-to-speech/plugin';

export const Plugins: Plugin[] = [
  pluginHideImages,
  pluginEmphasizeTitles,
  pluginHighlightLinks,
  pluginKeyboardNavigation,
  pluginTextToSpeech
];
