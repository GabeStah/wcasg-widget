import Utility from '@/utility';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';
import { DOMValueType } from 'classes/plugin/action';
import { PluginActionFunction } from 'classes/plugin/action/function';
import { IPluginElement } from 'classes/plugin/element';
import { PluginElementToggleable } from 'classes/plugin/element/toggleable';
import config from 'config';
import styles from './styles.scss';
import template from './template.html';

const createTooltip = ({ target, tooltip }: { target: any; tooltip: any }) => {
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
};

const destroyTooltip = ({ instance }: { instance: any }) => {
  if (instance) {
    instance.destroy();
  }
};

const mouseEvents = ['mouseenter', 'mouseleave', 'focus', 'blur'];

const handleMouseEvent = ({
  e,
  pluginAction,
  pluginElement
}: {
  e: any;
  pluginAction: PluginActionFunction;
  pluginElement: IPluginElement;
}) => {
  // Ensure plugin is enabled.
  if (!pluginElement.enabled) {
    return;
  }
  if (e.type === 'mouseenter' || e.type === 'focus') {
    // Set data-content value to accessible text of element.
    Utility.setNodeValue({
      type: DOMValueType.Attribute,
      name: 'data-content',
      value: Utility.Aria.getElementText({ element: e.target }),
      node: pluginAction.data.tooltip
    });
    // Show tooltip
    Utility.setNodeValue({
      type: DOMValueType.Attribute,
      name: 'data-tooltip-show',
      value: true,
      node: pluginAction.data.tooltip
    });
    // Create tooltip positioning
    pluginAction.data.popper = createTooltip({
      target: e.target,
      tooltip: pluginAction.data.tooltip
    });
  } else if (e.type === 'mouseleave' || e.type === 'blur') {
    Utility.removeNodeValue({
      type: DOMValueType.Attribute,
      name: 'data-content',
      node: pluginAction.data.tooltip
    });
    Utility.removeNodeValue({
      type: DOMValueType.Attribute,
      name: 'data-tooltip-show',
      node: pluginAction.data.tooltip
    });
    destroyTooltip({ instance: pluginAction.data.popper });
  }
};

export const pluginTooltip = new PluginElementToggleable({
  id: 'plugin-tooltips',
  title: 'Tooltips',
  enabled: false,
  actions: [
    new PluginActionFunction({
      name: 'tooltips-create-tooltip-action',
      // Convoluted query is to ensure no nodes with empty attribute values are matched.
      query: `*[aria-label]:not([aria-label=""]), *[aria-labelledby]:not([aria-labelledby=""]), *[aria-valuetext]:not([aria-valuetext=""]), img[alt]:not([alt=""])`,
      data: {
        tooltip: undefined,
        popper: undefined
      },
      initialize: (self: {
        data: {
          tooltip: any;
          popper: PopperInstance;
        };
      }) => {
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
        const nodes = Utility.Html.rawHtmlToNodes({ raw: template });
        const tooltipId = `${config.widgetId}-tooltip`;
        // Explicitly set id and class for proper styling from CSS module
        nodes[0].id = tooltipId;
        nodes[0].className = styles['wcasg-ada-app-tooltip'];
        parent.append(...nodes);
        // Assign to instance for later reference
        self.data.tooltip = document.getElementById(tooltipId);
      },
      /**
       * On enabled add event listeners for all queried nodes
       * @param self
       */
      func: (self: any) => {
        if (self.nodeList) {
          self.nodeList.forEach((node: any) => {
            mouseEvents.forEach(event => {
              if (node && typeof node.addEventListener === 'function') {
                node.addEventListener(event, (e: any) =>
                  handleMouseEvent({
                    e,
                    pluginAction: self,
                    pluginElement: pluginTooltip
                  })
                );
              }
            });
          });
        }
      }
    })
  ]
});
