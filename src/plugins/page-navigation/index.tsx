import { PluginComponentParams } from '@/enum';
import Utility from '@/utility';
import Aria from '@/utility/aria';
import config from 'config';
import findLast from 'lodash/findLast';
import React from 'react';
import { PluginComponent } from 'components/plugin';
import { Selectors } from 'state/redux/selectors';
import styles from 'styles/plugin/element.scss';

let isInitialized = false;

function initialize() {
  if (isInitialized) {
    return;
  }
  isInitialized = true;
}

function getOptions() {
  const headerTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  const allTags = headerTags.concat('A');
  const elements = document.querySelectorAll(allTags.join(', '));
  const options: any[] = [];
  // Iterate nodes
  elements.forEach((element: any) => {
    // Get ARIA text of element
    const text = Aria.getElementText({ element }).trim();
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

  return options.map((item: any, index: any) => {
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
}

export const Component = ({ state, actions, id }: PluginComponentParams) => {
  const plugin = new Selectors(state).getPlugin(id);

  const handleOnChange = (e: any) => {
    try {
      window.location.href = e.target.options[e.target.selectedIndex].value;
    } catch (error) {
      // Likely CORS failure.
      Utility.throwError(error);
    }
  };

  return (
    <div>
      <h2>{plugin.title}</h2>
      <select
        id={`${config.widgetId}-page-navigation-select`}
        name={'page-navigation'}
        size={1}
        onChange={handleOnChange}
      >
        {getOptions()}
      </select>
    </div>
  );
};

export default Component;
