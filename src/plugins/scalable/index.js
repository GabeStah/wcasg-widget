// @flow
import React from 'react';

import TextNodeType from 'classes/node-types/TextNodeType';
import ScalableComponent from 'components/scalable';
import BasePlugin from 'plugins/base';
import type { IPlugin } from 'plugins/base';

export interface IScalable extends IPlugin {
  id: string;
  title: string;
  propertyName: string;
  propertyUnit: string;
  nodeTypes: TextNodeType;
  defaults: ScalableDefaultsType;
}
export interface IScalableState {
  nodes: NodeList<HTMLElement>;
  adjustment: number;
  increment: number;
  minimum: number;
  maximum: number;
}

export type ScalableDefaultsType = {|
  adjustment: number,
  increment: number,
  minimum: number,
  maximum: number
|};

export type ScalableConstructorParams = {
  id: string,
  title: string,
  propertyName: string,
  propertyUnit: string,
  nodeTypes: TextNodeType,
  defaults: ScalableDefaultsType
};

export default class Scalable extends BasePlugin implements IScalable {
  id: string;
  title: string;
  propertyName: string;
  propertyUnit: string;
  nodeTypes: TextNodeType;
  defaults: ScalableDefaultsType;

  constructor(params: ScalableConstructorParams) {
    super({ id: params.id, title: params.title });

    this.id = params.id;
    this.title = params.title;
    this.propertyName = params.propertyName;
    this.propertyUnit = params.propertyUnit;
    this.nodeTypes = params.nodeTypes;
    this.defaults = params.defaults;
  }

  get component() {
    return <ScalableComponent {...this} />;
  }
}
