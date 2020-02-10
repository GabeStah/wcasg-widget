import { PluginComponentParams } from '@/enum';
import React from 'react';
import { PluginComponent } from 'components/plugin';

export const Component = (props: PluginComponentParams) => (
  <PluginComponent {...props} />
);

export default Component;
