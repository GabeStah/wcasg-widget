// @flow
import React from 'react';

export interface IPlugin {
  id: string;
  title: string;
}

export type BasePluginParamsType = {
  id: string,
  title: string
};

export default class BasePlugin implements IPlugin {
  id: string;
  title: string;

  constructor(params: BasePluginParamsType) {
    this.id = params.id;
    this.title = params.title;
  }
}
