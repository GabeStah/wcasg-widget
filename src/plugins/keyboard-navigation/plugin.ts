import { Plugin, PluginActionTypes } from '@/enum';
import { Aria } from '@/utility/aria';
import Css from '@/utility/css';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import findLastIndex from 'lodash/findLastIndex';
import { Ids } from 'plugins/data';
import { select } from 'redux-saga/effects';
import { Selectors } from 'state/redux/selectors';

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

const queryString = tags.join(', ');

export enum KeyCodes {
  T = 84,
  G = 71,
  L = 76,
  I = 73,
  F = 70,
  H = 72
}

const findMatchingIndexReverse = (
  nodeList: any,
  searchTags: string[],
  focusedNodeIndex: number
) => {
  let matchIndex = findLastIndex(
    nodeList,
    (node: any) => searchTags.includes(node.tagName),
    // Decrement search start by 1 to avoid matching same element
    focusedNodeIndex ? focusedNodeIndex - 1 : undefined
  );
  // If no match and current focus exists, search from beginning
  if (matchIndex === -1 && focusedNodeIndex) {
    matchIndex = findLastIndex(nodeList, (node: any) =>
      searchTags.includes(node.tagName)
    );
  }
  return matchIndex;
};

const findMatchingIndex = (
  nodeList: any,
  searchTags: string[],
  focusedNodeIndex: number
) => {
  let matchIndex = findIndex(
    nodeList,
    (node: any) => searchTags.includes(node.tagName),
    // Increment search start by 1 to avoid matching same element
    focusedNodeIndex ? focusedNodeIndex + 1 : undefined
  );
  // If no match and current focus exists, search from beginning
  if (matchIndex === -1 && focusedNodeIndex) {
    matchIndex = findIndex(nodeList, (node: any) =>
      searchTags.includes(node.tagName)
    );
  }
  return matchIndex;
};

function* changeFocus({
  searchTags,
  isReverse = false,
  focusedNode
}: {
  searchTags: string[];
  isReverse?: boolean;
  focusedNode?: any;
}) {
  // Current focus
  const currentlyFocusedNode = focusedNode
    ? focusedNode
    : Aria.findFocusedNode();
  let currentlyFocusedNodeIndex = 0;

  const nodeList = document.querySelectorAll(queryString);
  if (!nodeList) {
    return;
  }

  // If exists, get index in full node list
  if (currentlyFocusedNode) {
    currentlyFocusedNodeIndex = findIndex(
      nodeList,
      (node: any) => node === currentlyFocusedNode
    );
  }

  const matchIndex = isReverse
    ? findMatchingIndexReverse(nodeList, searchTags, currentlyFocusedNodeIndex)
    : findMatchingIndex(nodeList, searchTags, currentlyFocusedNodeIndex);

  // Either no match or only match already focused.
  if (matchIndex === -1 || matchIndex === currentlyFocusedNodeIndex) {
    // No match, do nothing
    return;
  }

  // Match found
  if (currentlyFocusedNode) {
    // Blur existing node
    Aria.blurNode({ node: currentlyFocusedNode });
  }
  // Clear all leftover focused classes
  Css.clearAllFocused();

  // Focus new node
  Aria.focusNode({ node: nodeList[matchIndex] });
  // Return for processing
  return nodeList[matchIndex];
}

const mapKeysToParams = [
  {
    key: 't',
    searchTags: table,
    isReverse: false
  },
  {
    key: 'T',
    searchTags: table,
    isReverse: true
  },
  {
    key: 'g',
    searchTags: image,
    isReverse: false
  },
  {
    key: 'G',
    searchTags: image,
    isReverse: true
  },
  {
    key: 'l',
    searchTags: listAndMenu,
    isReverse: false
  },
  {
    key: 'L',
    searchTags: listAndMenu,
    isReverse: true
  },
  {
    key: 'i',
    searchTags: listAndMenuItems,
    isReverse: false
  },
  {
    key: 'I',
    searchTags: listAndMenuItems,
    isReverse: true
  },
  {
    key: 'f',
    searchTags: elements,
    isReverse: false
  },
  {
    key: 'F',
    searchTags: elements,
    isReverse: true
  },
  {
    key: 'h',
    searchTags: headings,
    isReverse: false
  },
  {
    key: 'H',
    searchTags: headings,
    isReverse: true
  }
];

export function* handleKeyboardNavigation(e?: any) {
  const state = yield select();
  const selectors = new Selectors(state);
  const statePlugin = selectors.getPlugin(pluginObject.id);
  const currentFocusedNode = selectors.getFocusedNode();

  if (!statePlugin.enabled) {
    return;
  }
  // Ensure no unexpected modifiers
  if (e.ctrlKey || e.altKey) {
    return;
  }

  const match = find(mapKeysToParams, ['key', e.key]);
  if (!match) {
    return;
  }

  return yield changeFocus({
    focusedNode: currentFocusedNode,
    searchTags: match.searchTags,
    isReverse: match.isReverse
  });
}

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
export const pluginObject: Plugin = {
  id: Ids.KeyboardNavigation,
  title: 'Keyboard Navigation',
  enabled: false,
  options: [],
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: []
    },
    {
      on: PluginActionTypes.disable,
      // Remove all focus class assignments.
      func: [() => Css.clearAllFocused()]
    }
  ]
};

export default pluginObject;
