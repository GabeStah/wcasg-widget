import { Plugin, PluginActionTypes } from '@/types';
import Utility from '@/utility';
import Html from '@/utility/html';
import { DOMValueType } from 'classes/plugin/action';
import { Ids } from 'plugins/data';
import isArrayLike from 'lodash/isArrayLike';

interface IconReplacementMap {
  id: string;
  replacement: HTMLElement | Node;
  original: HTMLElement | Node;
}

const REPLACEMENT_MAP: IconReplacementMap[] = [];

const ICONS = {
  cross:
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M31.708 25.708L22 16l9.708-9.708a1 1 0 000-1.414L27.122.292a1 1 0 00-1.414-.001L16 9.999 6.292.291a.998.998 0 00-1.414.001L.292 4.878a1 1 0 000 1.414L10 16 .292 25.708a.999.999 0 000 1.414l4.586 4.586a1 1 0 001.414 0L16 22l9.708 9.708a1 1 0 001.414 0l4.586-4.586a.999.999 0 000-1.414z"/></svg>',
  floppy:
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M28 0H0v32h32V4l-4-4zM16 4h4v8h-4V4zm12 24H4V4h2v10h18V4h2.343L28 5.657V28z"/></svg>',
  stop:
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 29C8.82 29 3 23.18 3 16S8.82 3 16 3s13 5.82 13 13-5.82 13-13 13zm-6-19h12v12H10z"/></svg>',
  stop1:
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M4 4h24v24H4z"/></svg>',
  pause:
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M4 4h10v24H4zm14 0h10v24H18z"/></svg>',
  pause1:
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 29C8.82 29 3 23.18 3 16S8.82 3 16 3s13 5.82 13 13-5.82 13-13 13zm-6-19h4v12h-4zm8 0h4v12h-4z"/></svg>',
  play:
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M30.662 5.003C26.174 4.358 21.214 4 16 4S5.826 4.358 1.338 5.003C.478 8.369 0 12.089 0 16s.477 7.63 1.338 10.997C5.827 27.642 10.786 28 16 28s10.174-.358 14.662-1.003C31.522 23.631 32 19.911 32 16s-.477-7.63-1.338-10.997zM12 22V10l10 6-10 6z"/></svg>',
  play1:
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M6 4l20 12L6 28z"/></svg>'
};

/**
 * Tags for icons
 * button
 * i
 * svg
 * a
 * span
 */

// const keywords = ['save', 'close', 'stop', 'pause', 'play'];
// const tags = ['button', 'i', 'svg', 'a', 'span'];
// const attributes = ['class', 'id', 'data-item', 'aria-label'];

/**
 * attributes for icons
 * <span>type</span>
 * <a>type</a>
 * *[class*="type"]
 * *[id*="type"]
 * *[data-item*="type"]
 * *[aria-label*="type"]
 */

/**
 * ::before { content: "\f030"; }
 *
 */

interface IconReplacement {
  icon?: string;
  element?: string | HTMLElement;
}

interface IconReplacementSearch {
  attributes: string[];
  keywords: string[];
  replacement: IconReplacement;
  tags: string[];
}

const replacementSearches: IconReplacementSearch[] = [
  {
    attributes: ['class', 'id', 'data-item', 'aria-label'],
    keywords: ['save'],
    replacement: {
      icon: ICONS.floppy
    },
    tags: ['svg', 'i']
  },
  // {
  //   attributes: ['class', 'id', 'data-item', 'aria-label'],
  //   keywords: ['save'],
  //   replacement: {
  //     element: '<p>Hello there</p>'
  //   },
  //   tags: ['svg', 'i']
  // },
  {
    attributes: ['class', 'id', 'data-item', 'aria-label'],
    keywords: ['stop'],
    replacement: {
      icon: ICONS.stop1
    },
    tags: ['svg', 'i']
  },
  {
    attributes: ['class', 'id', 'data-item', 'aria-label'],
    keywords: ['play'],
    replacement: {
      icon: ICONS.play
    },
    tags: ['svg', 'i']
  },
  {
    attributes: ['class', 'id', 'data-item', 'aria-label'],
    keywords: ['pause'],
    replacement: {
      icon: ICONS.pause
    },
    tags: ['svg', 'i']
  },
  {
    attributes: ['class', 'id', 'data-item', 'aria-label'],
    keywords: ['close', 'exit', 'cancel'],
    replacement: {
      icon: ICONS.cross
    },
    tags: ['svg', 'i']
  }
];

function* applyReplacements(searches: IconReplacementSearch[]) {
  searches.forEach((search: IconReplacementSearch) => {
    let newElement;
    if (search.replacement.icon) {
      newElement = Html.rawHtmlToNodes({ raw: search.replacement.icon });
      if (isArrayLike(newElement)) {
        newElement = newElement[0];
      }
    } else if (search.replacement.element) {
      if (typeof search.replacement.element === 'string') {
        newElement = Html.rawHtmlToNodes({ raw: search.replacement.element });
        if (isArrayLike(newElement)) {
          newElement = newElement[0];
        }
      } else {
        newElement = search.replacement.element;
      }
    } else {
      return;
    }

    // Generate Cartesian products
    const queries: any[] = [];
    search.tags.forEach((tag: string) =>
      search.keywords.forEach((keyword: string) =>
        search.attributes.forEach((attribute: string) =>
          queries.push({ keyword, attribute, tag })
        )
      )
    );

    // Create full query string for all matching nodes.
    const queryString = queries.reduce(
      (initial: any, current: any) =>
        `${initial ? initial + ', ' : initial}${current.tag}[${
          current.attribute
        }*="${current.keyword}"]`,
      ''
    );

    const found = document.querySelectorAll(queryString);
    if (found) {
      for (const original of found) {
        if (newElement) {
          // Generate unique ID
          const id = Utility.generateGuid();
          // Generate clone for insertion
          const replacement = newElement.cloneNode(true);
          // Assign data-replacement-id to replacement element for later reference
          Utility.setNodeValue({
            value: id,
            name: 'data-replacement-id',
            type: DOMValueType.Attribute,
            node: replacement
          });
          // Map id, original, and replacement
          REPLACEMENT_MAP.push({
            id,
            original,
            replacement
          });
          // Replace original element
          original.replaceWith(replacement);
        }
      }
    }
  });
}

/**
 * Remove replacements and re-insert original nodes.
 * @returns {Generator<never, void, unknown>}
 */
function* resetOriginals() {
  if (REPLACEMENT_MAP) {
    REPLACEMENT_MAP.forEach((value: IconReplacementMap) => {
      const inserted = document.querySelector(
        `[data-replacement-id="${value.id}"]`
      );
      if (inserted) {
        // Return original back
        inserted.replaceWith(value.original);
      }
    });
  }
}

export const pluginObject: Plugin = {
  id: Ids.LargeIcons,
  title: 'Large Icons',
  enabled: false,
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: [() => applyReplacements(replacementSearches)]
    },
    {
      on: PluginActionTypes.disable,
      func: [resetOriginals]
    }
  ]
};

export default pluginObject;
