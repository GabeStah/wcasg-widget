import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
// @ts-ignore
import { ReactComponent as IconBadge } from 'assets/svg-minified/plugins/badge.svg';
// @ts-ignore
import { ReactComponent as IconBook } from 'assets/svg-minified/plugins/book.svg';
// @ts-ignore
import { ReactComponent as IconContrast } from 'assets/svg-minified/plugins/contrast.svg';
// @ts-ignore
import { ReactComponent as IconCursor } from 'assets/svg-minified/plugins/cursor.svg';
// @ts-ignore
import { ReactComponent as IconDisableImages } from 'assets/svg-minified/plugins/disable-images.svg';
// @ts-ignore
import { ReactComponent as IconEmphasizeHover } from 'assets/svg-minified/plugins/emphasize-hover.svg';
// @ts-ignore
import { ReactComponent as IconEmphasizeLinks } from 'assets/svg-minified/plugins/emphasize-links.svg';
// @ts-ignore
import { ReactComponent as IconEmphasizeTitlesAlt } from 'assets/svg-minified/plugins/emphasize-titles-alt.svg';
// @ts-ignore
import { ReactComponent as IconEmphasizeTitles } from 'assets/svg-minified/plugins/emphasize-titles.svg';
// @ts-ignore
import { ReactComponent as IconFontSize } from 'assets/svg-minified/plugins/font-size.svg';
// @ts-ignore
import { ReactComponent as IconFontSpacing } from 'assets/svg-minified/plugins/font-spacing.svg';
// @ts-ignore
import { ReactComponent as IconFontType } from 'assets/svg-minified/plugins/font-type.svg';
// @ts-ignore
import { ReactComponent as IconInvertColors } from 'assets/svg-minified/plugins/invert-colors.svg';
// @ts-ignore
import { ReactComponent as IconKeyboardNavigation } from 'assets/svg-minified/plugins/keyboard-nav.svg';
// @ts-ignore
import { ReactComponent as IconMute } from 'assets/svg-minified/plugins/mute.svg';
// @ts-ignore
import { ReactComponent as IconNote } from 'assets/svg-minified/plugins/note.svg';
// @ts-ignore
import { ReactComponent as IconOnscreenKeyboard } from 'assets/svg-minified/plugins/onscreen-keyboard.svg';
// @ts-ignore
import { ReactComponent as IconPauseAnimations } from 'assets/svg-minified/plugins/pause-animations.svg';
// @ts-ignore
// @ts-ignore
import { ReactComponent as IconTextToSpeech } from 'assets/svg-minified/plugins/text-to-speech.svg';
// @ts-ignore
import { ReactComponent as IconTooltip } from 'assets/svg-minified/plugins/tooltip.svg';
import React from 'react';

export enum Ids {
  BlackAndYellow = 'black-and-yellow',
  Contrast = 'contrast',
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
  [Ids.Contrast.toString()]: IconContrast,
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

const keyboardNavigationDescription = (
  <div>
    <Typography variant={'h2'} align={'center'}>
      Keyboard Navigation Hotkeys
    </Typography>
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>T</Avatar>
        </ListItemAvatar>
        <ListItemText primary='Tables' secondary='Iterates over all tables.' />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>G</Avatar>
        </ListItemAvatar>
        <ListItemText primary='Images' secondary='Iterates over all images.' />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>L</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary='Lists & Menus'
          secondary='Navigates through all top-level lists and menu elements.'
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>I</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary='List Items'
          secondary='Navigates between all list items.'
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>F</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary='Elements'
          secondary='Jumps between all sectioned content including articles, navigation, headers, footers, etc.'
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>H</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary='Headings'
          secondary='Iterates over all headings/titles.'
        />
      </ListItem>
    </List>
  </div>
);

export const Descriptions = {
  [Ids.Contrast.toString()]: 'Applies the selected contrasting theme to the page.',
  [Ids.EmphasizeHover.toString()]: 'Emphasizes all elements under the mouse cursor.',
  [Ids.EmphasizeTitles.toString()]: 'Emphasizes all header elements.',
  [Ids.FontSize.toString()]: 'Incrementally adjusts font size.',
  [Ids.HideImages.toString()]: 'Hides all images.',
  [Ids.HighlightForms.toString()]: 'Highlights all forms.',
  [Ids.HighlightLinks.toString()]: 'Highlights all links.',
  [Ids.KeyboardNavigation.toString()]: keyboardNavigationDescription,
  [Ids.LargeCursor.toString()]: 'Applies oversized cursor icons.',
  [Ids.LargeIcons.toString()]: 'Increases icon sizes.',
  [Ids.LetterSpacing.toString()]: 'Incrementally adjusts character spacing.',
  [Ids.MuteAudio.toString()]: 'Mutes all page audio.',
  [Ids.PageNavigation.toString()]: 'Provides a collection of important page links in a selection dropdown.',
  [Ids.ReadableFonts.toString()]: 'Applies the selected alternative font to the page.',
  [Ids.StopAnimations.toString()]: 'Halts all CSS animations and transformations.',
  [Ids.TextToSpeech.toString()]: 'Activates an advanced text-to-speech reader.  Adjustable options include voice, pitch, rate of speech, and volume.  The "links" behavior reads only linked content.  The "click" behavior reads the clicked element.',
  [Ids.Tooltip.toString()]: 'Activates hover tooltips for important page elements.',
  [Ids.VirtualKeyboard.toString()]: 'Activates a clickable virtual keyboard.'
};
