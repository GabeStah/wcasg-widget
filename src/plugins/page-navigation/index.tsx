import { PluginComponentParams } from '@/enum';
import Utility from '@/utility';
import Aria from '@/utility/aria';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import findLast from 'lodash/findLast';
import React from 'react';
import { Selectors } from 'state/redux/selectors';
import styles from './styles.scss';

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
  // const allTags = headerTags.concat(`A > *:not(${config.widgetId}))`);
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
      options.push({
        tagName: element.tagName,
        text,
        href: element.href,
        element
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

export const Component = ({ state, actions, id }: PluginComponentParams) => {
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
    <div>
      <Typography component={'h2'}>{plugin.title}</Typography>
      <FormControl>
        <InputLabel htmlFor={`${plugin.id}-select-label`}>
          Page Select
        </InputLabel>
        <Select
          id={`${plugin.id}-select`}
          labelId={`${plugin.id}-select-label`}
          name={'page-navigation'}
          onChange={handleOnChange}
          className={styles.pageNavigation}
          defaultValue={''}
          input={<Input id={`${plugin.id}-select-label`} />}
        >
          {selectOptions().map((item: any, index: any) => {
            if (headerTags.includes(item.tagName)) {
              return (
                <ListSubheader
                  key={index}
                  aria-label={`[${item.tagName}]${item.text}`}
                >
                  {item.text}
                </ListSubheader>
              );
            } else {
              return (
                <MenuItem key={index} value={item.href}>
                  {item.text}
                </MenuItem>
              );
            }
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Component;
