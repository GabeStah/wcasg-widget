import { Plugin, PluginProperty, PluginPropertyOption } from '@/types';

export default {
  isPlugin: (value: Plugin | string | void): value is Plugin =>
    (value as Plugin).id !== undefined &&
    (value as Plugin).title !== undefined &&
    (value as Plugin).tasks !== undefined,
  isPluginProperty: (
    value: PluginProperty | string | void
  ): value is PluginProperty => (value as PluginProperty).id !== undefined,
  isPluginPropertyOption: (
    value: PluginPropertyOption | string | void
  ): value is PluginPropertyOption =>
    (value as PluginPropertyOption).id !== undefined &&
    (value as PluginPropertyOption).text !== undefined &&
    (value as PluginPropertyOption).value !== undefined
};
