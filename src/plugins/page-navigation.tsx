import Utility from '@/utility';
import { PluginElementCustom } from 'classes/plugin/element/custom';
import config from 'config';
import findLast from 'lodash/findLast';
import React from 'react';
import styles from 'styles/plugin/element.scss';

export const pluginPageNavigation = new PluginElementCustom({
  title: 'Page Navigation',
  /**
   * Gather collection of headers and links, in order of DOM tree.
   *
   * TODO: Eliminate duplications wherever possible.
   *
   * @param self
   */
  initialize: (self: any) => {
    const headerTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    const allTags = headerTags.concat('A');
    const elements = document.querySelectorAll(allTags.join(', '));
    const options: any[] = [];
    // Iterate nodes
    elements.forEach((element: any) => {
      // Get ARIA text of element
      const text = Utility.Aria.getElementText({ element }).trim();
      // If header
      if (headerTags.includes(element.tagName)) {
        options.push({
          tagName: element.tagName,
          text,
          element,
          links: []
        });
      } else {
        const latestHeader = findLast(options, option =>
          headerTags.includes(option.tagName)
        );
        if (latestHeader) {
          latestHeader.links.push({
            tagName: element.tagName,
            text,
            href: element.href,
            element
          });
        } else {
          options.push({
            tagName: element.tagName,
            text,
            href: element.href,
            element
          });
        }
      }
    });

    self.options.navigation = options;
  },
  /**
   * Renders page navigation select box based on parsed navigation array in init.
   *
   * TODO: Improve via aria specs with keyboard nav/search.
   * @see https://www.w3.org/TR/wai-aria-practices-1.2/examples/listbox/listbox-grouped.html
   *
   * @see https://www.w3.org/TR/wai-aria-practices-1.2/#Listbox
   *
   * @param self
   * @returns {any}
   */
  template: (self: any) => {
    const headerTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    const options = self.options.navigation.map((item: any, index: any) => {
      if (headerTags.includes(item.tagName)) {
        return (
          <optgroup key={index} label={`[${item.tagName}]${item.text}`}>
            {item.links.map((link: any, linkIndex: any) => {
              // Ensure href exists.
              if (link.href) {
                return (
                  <option key={linkIndex} value={link.href}>
                    {link.text}
                  </option>
                );
              }
            })}
          </optgroup>
        );
      } else {
        // Ensure href exists.
        if (item.href) {
          return (
            <option key={index} value={item.href}>
              {item.text}
            </option>
          );
        }
      }
    });

    const handleOnChange = (e: any) => {
      try {
        window.location.href = e.target.options[e.target.selectedIndex].value;
      } catch (error) {
        // Likely CORS failure.
        Utility.throwError(error);
      }
    };

    return (
      <div
        className={`${styles['plugin-element']} ${
          styles['plugin-element-custom']
        }`}
      >
        <h3>{self.title}</h3>
        <select
          id={`${config.widgetId}-page-navigation-select`}
          name={'page-navigation'}
          size={1}
          onChange={handleOnChange}
        >
          {options}
        </select>
      </div>
    );
  }
});
