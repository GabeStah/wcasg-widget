import { PluginComponentParams } from '@/types';
import React from 'react';
import { PluginComponent } from 'components/plugin';

export const Component = (props: PluginComponentParams) => (
  <PluginComponent {...props} />
);

export default Component;
