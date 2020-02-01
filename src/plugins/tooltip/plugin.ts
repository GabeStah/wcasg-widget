import { Plugin, PluginActionTypes } from '@/enum';
import Utility from '@/utility';
import Aria from '@/utility/aria';
import { Html } from '@/utility/html';
import { createPopper } from '@popperjs/core';
import { DOMValueType } from 'classes/plugin/action';
import config from 'config';
import { Ids } from 'plugins/data';
import styles from './styles.scss';
// @ts-ignore
import template from './template.html';

interface ILocalState {
  enabled: boolean;
  initialized: boolean;
  mouseEvents: string[];
  popper: any;
  queryString: string;
  tooltip: any;
}

const LocalState: ILocalState = {
  enabled: false,
  initialized: false,
  mouseEvents: ['mouseenter', 'mouseleave', 'focus', 'blur'],
  popper: undefined,
  queryString: `*[aria-label]:not([aria-label=""]), *[aria-labelledby]:not([aria-labelledby=""]), *[aria-valuetext]:not([aria-valuetext=""]), img[alt]:not([alt=""])`,
  tooltip: undefined
};

function createTooltip({ target, tooltip }: { target: any; tooltip: any }) {
  return createPopper(target, tooltip, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ]
  });
}

function destroyTooltip({ instance }: { instance: any }) {
  if (instance) {
    instance.destroy();
  }
}

function handleMouseEvent(e: any) {
  // Ensure plugin is enabled.
  if (!LocalState.enabled) {
    return;
  }
  if (e.type === 'mouseenter' || e.type === 'focus') {
    // Set data-content value to accessible text of element.
    Utility.setNodeValue({
      type: DOMValueType.Attribute,
      name: 'data-content',
      value: Aria.getElementText({ element: e.target }),
      node: LocalState.tooltip
    });
    // Show tooltip
    Utility.setNodeValue({
      type: DOMValueType.Attribute,
      name: 'data-tooltip-show',
      value: true,
      node: LocalState.tooltip
    });
    // Create tooltip positioning
    LocalState.popper = createTooltip({
      target: e.target,
      tooltip: LocalState.tooltip
    });
  } else if (e.type === 'mouseleave' || e.type === 'blur') {
    Utility.removeNodeValue({
      type: DOMValueType.Attribute,
      name: 'data-content',
      node: LocalState.tooltip
    });
    Utility.removeNodeValue({
      type: DOMValueType.Attribute,
      name: 'data-tooltip-show',
      node: LocalState.tooltip
    });
    destroyTooltip({ instance: LocalState.popper });
  }
}

function initialize() {
  const body = document.getElementsByTagName('body');
  const html = document.getElementsByTagName('html');
  let parent;
  if (body && body[0]) {
    parent = body[0];
  } else if (html && html[0]) {
    parent = html[0];
  }
  if (!parent) {
    return;
  }

  // Create nodes from template string
  const nodes = Html.rawHtmlToNodes({ raw: template });
  const tooltipId = `${config.widgetId}-tooltip`;
  // Explicitly set id and class for proper styling from CSS module
  nodes[0].id = tooltipId;
  nodes[0].className = styles['wcasg-ada-app-tooltip'];
  parent.append(...nodes);
  // Assign to instance for later reference
  LocalState.tooltip = document.getElementById(tooltipId);
  LocalState.initialized = true;
}

function* onEnable() {
  LocalState.enabled = true;
  // Initialize, if necessary
  if (!LocalState.initialized) {
    initialize();
  }
  const nodeList = document.querySelectorAll(LocalState.queryString);
  if (!nodeList) {
    return;
  }
  nodeList.forEach((node: any) => {
    LocalState.mouseEvents.forEach(event => {
      if (node && typeof node.addEventListener === 'function') {
        node.addEventListener(event, handleMouseEvent);
      }
    });
  });
}

function* onDisable() {
  LocalState.enabled = false;
  const nodeList = document.querySelectorAll(LocalState.queryString);
  if (!nodeList) {
    return;
  }
  nodeList.forEach((node: any) => {
    LocalState.mouseEvents.forEach(event => {
      if (node && typeof node.addEventListener === 'function') {
        node.removeEventListener(event, handleMouseEvent);
      }
    });
  });
}

export const pluginObject: Plugin = {
  id: Ids.Tooltip,
  title: 'Tooltip',
  enabled: false,
  options: [],
  tasks: [
    {
      on: PluginActionTypes.enable,
      func: [onEnable]
    },
    {
      on: PluginActionTypes.disable,
      func: [onDisable]
    }
  ]
};

export default pluginObject;
