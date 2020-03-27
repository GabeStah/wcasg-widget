import { PluginComponentParams } from '@/types';
import { PluginComponent } from 'components/plugin';
import React from 'react';

export const Component = (props: PluginComponentParams) => (
  <PluginComponent {...props} />
);

export default Component;
