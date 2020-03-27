import { PluginComponentParams, SelectOption } from '@/types';
import Utility from '@/utility';
import Aria from '@/utility/aria';
import FormControl from '@material-ui/core/FormControl';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import { PluginComponent } from 'components/plugin';
import SelectComponent from 'components/select';
import findLast from 'lodash/findLast';
import React from 'react';
import { Selectors } from 'state/redux/selectors';

let isInitialized = false;

function initialize() {
  if (isInitialized) {
    return;
  }
  isInitialized = true;
}

const headerTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
const allTags = headerTags.concat('A');

function selectOptions() {
  const elements = document.querySelectorAll(
    allTags.map((tag: string) => 'body '.concat(tag)).join(', ')
  );
  const options: SelectOption[] = [];
  // const options: any[] = [];
  // Iterate nodes
  elements.forEach((element: any) => {
    // Get ARIA text of element
    const text = Aria.getElementText({ element }).trim();
    // If header
    if (headerTags.includes(element.tagName)) {
      options.push({
        isGroup: true,
        text,
        value: element.href
      });
    } else {
      options.push({
        isGroup: false,
        text,
        value: element.href
      });
    }
  });
  return options;
}

function getOptions() {
  const elements = document.querySelectorAll(
    allTags.map((tag: string) => 'body '.concat(tag)).join(', ')
  );
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
        <>
          <ListSubheader
            key={index}
            aria-label={`[${item.tagName}]${item.text}`}
          >
            {item.text}
          </ListSubheader>
          {item.links.map((link: any, linkIndex: any) => {
            // Ensure href exists.
            if (link.href) {
              return (
                <MenuItem key={linkIndex} value={link.href}>
                  {link.text}
                </MenuItem>
              );
            }
          })}
        </>
      );
    } else {
      // Ensure href exists.
      if (item.href) {
        return (
          <MenuItem key={index} value={item.href}>
            {item.text}
          </MenuItem>
        );
      }
    }
  });
}

export const Component = ({
  state,
  actions,
  id,
  theme
}: PluginComponentParams) => {
  const plugin = new Selectors(state).getPlugin(id);

  const handleOnChange = (
    event: React.ChangeEvent<{ value: any }>,
    value: any
  ) => {
    try {
      window.location.href = event.target.value;
    } catch (error) {
      // Likely CORS failure.
      Utility.throwError(error);
    }
  };

  return (
    <PluginComponent
      actions={actions}
      state={state}
      id={id}
      toggleDisabled={true}
      theme={theme}
    >
      <FormControl>
        <SelectComponent
          actions={actions}
          plugin={plugin}
          name={'Select Page'}
          showLabel={false}
          onChangeHandler={handleOnChange}
          options={selectOptions()}
          state={state}
        />
      </FormControl>
    </PluginComponent>
  );
};

export default Component;
