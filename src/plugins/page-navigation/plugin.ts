import { Plugin } from '@/types';
import { Ids } from 'plugins/data';

export const pluginObject: Plugin = {
  id: Ids.PageNavigation,
  title: 'Page Navigation',
  enabled: false,
  customComponent: true,
  tasks: []
};

export default pluginObject;
