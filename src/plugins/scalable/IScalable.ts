import TextNodeType from 'classes/node-types/TextNodeType';
import { IPlugin } from 'plugins/base/IPlugin';
import { IScalableState } from 'plugins/scalable/IScalableState';
import { ScalableDefaultsType } from 'plugins/scalable/ScalableDefaultsType';

export interface IScalable extends IPlugin {
  propertyName: string;
  propertyUnit: string;
  nodeTypes: TextNodeType;
  defaults: ScalableDefaultsType;
  state: IScalableState;
  nodes: NodeList | null | undefined;
  displayValue: (plugin: IScalable, props: any) => string;
  onUpdate: (plugin: IScalable, props: any) => void;
}
