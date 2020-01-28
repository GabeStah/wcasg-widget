import Utility from '@/utility';
import { PluginActionFunction } from 'classes/plugin/action/function';
import { IPluginElement } from 'classes/plugin/element';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import findIndex from 'lodash/findIndex';
import findLastIndex from 'lodash/findLastIndex';

/**
 * Categorizations based on client description and functionality.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 */
const table = ['TABLE'];
const image = ['IMAGE', 'IMG'];
const listAndMenu = ['UL', 'OL', 'DL', 'MENU'];
const listAndMenuItems = ['LI', 'DT', 'DD'];
const menuItems = ['MENUITEM'];
const elements = [
  'ADDRESS',
  'ARTICLE',
  'ASIDE',
  'FOOTER',
  'HEADER',
  'HGROUP',
  'MAIN',
  'NAV',
  'SECTION'
];
const headings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
const tags = [
  ...table,
  ...image,
  ...listAndMenu,
  ...listAndMenuItems,
  ...menuItems,
  ...elements,
  ...headings
];

enum KeyCodes {
  T = 84,
  G = 71,
  L = 76,
  I = 73,
  F = 70,
  H = 72
}

const findMatchingIndexReverse = (
  plugin: PluginActionFunction,
  searchTags: string[],
  focusedNodeIndex: number
) => {
  let matchIndex = findLastIndex(
    plugin.nodeList,
    (node: any) => searchTags.includes(node.tagName),
    // Decrement search start by 1 to avoid matching same element
    focusedNodeIndex ? focusedNodeIndex - 1 : undefined
  );
  // If no match and current focus exists, search from beginning
  if (matchIndex === -1 && focusedNodeIndex) {
    matchIndex = findLastIndex(plugin.nodeList, (node: any) =>
      searchTags.includes(node.tagName)
    );
  }
  return matchIndex;
};

const findMatchingIndex = (
  plugin: PluginActionFunction,
  searchTags: string[],
  focusedNodeIndex: number
) => {
  let matchIndex = findIndex(
    plugin.nodeList,
    (node: any) => searchTags.includes(node.tagName),
    // Increment search start by 1 to avoid matching same element
    focusedNodeIndex ? focusedNodeIndex + 1 : undefined
  );
  // If no match and current focus exists, search from beginning
  if (matchIndex === -1 && focusedNodeIndex) {
    matchIndex = findIndex(plugin.nodeList, (node: any) =>
      searchTags.includes(node.tagName)
    );
  }
  return matchIndex;
};

const changeFocus = ({
  plugin,
  searchTags,
  isReverse = false
}: {
  plugin: PluginActionFunction;
  searchTags: string[];
  isReverse?: boolean;
}) => {
  const matchIndex = isReverse
    ? findMatchingIndexReverse(plugin, searchTags, plugin.data.focusedNodeIndex)
    : findMatchingIndex(plugin, searchTags, plugin.data.focusedNodeIndex);

  // Either no match or only match already focused.
  if (matchIndex === -1 || matchIndex === plugin.data.focusedNodeIndex) {
    // No match, do nothing
    return;
  }

  // Match found
  const focusedNode: any = plugin.data.focusedNodeIndex
    ? plugin.nodeList[plugin.data.focusedNodeIndex]
    : undefined;
  if (focusedNode) {
    // Blur existing node
    Utility.Aria.blurNode({ node: focusedNode });
  }
  plugin.data.focusedNodeIndex = matchIndex;
  const newFocusedNode = plugin.nodeList[plugin.data.focusedNodeIndex];

  // Focus new node
  Utility.Aria.focusNode({ node: newFocusedNode });
};

const handleKeyDown = (
  e: any,
  plugin: PluginActionFunction,
  element: IPluginElement
) => {
  if (!element.enabled) {
    return;
  }
  // Ensure no unexpected modifiers
  if (e.ctrlKey || e.altKey) {
    return;
  }

  switch (e.which) {
    case KeyCodes.T:
      e.stopImmediatePropagation();
      e.preventDefault();
      changeFocus({ plugin, searchTags: table, isReverse: e.shiftKey });
      break;
    case KeyCodes.G:
      e.stopImmediatePropagation();
      e.preventDefault();
      changeFocus({ plugin, searchTags: image, isReverse: e.shiftKey });
      break;
    case KeyCodes.L:
      e.stopImmediatePropagation();
      e.preventDefault();
      changeFocus({ plugin, searchTags: listAndMenu, isReverse: e.shiftKey });
      break;
    case KeyCodes.I:
      e.stopImmediatePropagation();
      e.preventDefault();
      changeFocus({
        plugin,
        searchTags: listAndMenuItems,
        isReverse: e.shiftKey
      });
      break;
    case KeyCodes.F:
      e.stopImmediatePropagation();
      e.preventDefault();
      changeFocus({ plugin, searchTags: elements, isReverse: e.shiftKey });
      break;
    case KeyCodes.H:
      e.stopImmediatePropagation();
      e.preventDefault();
      changeFocus({ plugin, searchTags: headings, isReverse: e.shiftKey });
      break;
    default:
      return;
  }
};

/**
 * Provides keyboard navigation capabilities for critical tags/sections of the DOM.
 *
 * Keystrokes
 * T – jump between tables
 * G – jump between images
 * L – jump between lists
 * I – jump through list & menu items
 * F – jump between elements (header, body, sections, etc)
 * H – jump between titles (headings)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
 * @type {PluginElementToggleable}
 */
export const pluginKeyboardNavigation = new PluginElementToggleable({
  id: 'plugin-keyboard-navigation',
  title: 'Keyboard Navigation',
  enabled: false,
  actions: [
    new PluginActionFunction({
      name: 'keyboard-navigation-action',
      data: {
        focusedNodeIndex: undefined
      },
      funcOnDisable: [
        (self: PluginActionFunction) => {
          // Remove active focus
          Utility.Aria.blurNode({
            node: self.nodeList[self.data.focusedNodeIndex]
          });
          self.data.focusedNodeIndex = undefined;
        }
      ],
      initialize: (self: PluginActionFunction) => {
        // Add event listener one time.
        document.addEventListener('keydown', e =>
          handleKeyDown(e, self, pluginKeyboardNavigation)
        );
      },
      query: tags.join(', ')
    })
  ]
});
