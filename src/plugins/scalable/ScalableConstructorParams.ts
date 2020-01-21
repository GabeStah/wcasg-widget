import { DOMManipulationType } from '@/plugins';
import TextNodeType from 'classes/node-types/TextNodeType';
import { ScalableDefaultsType } from 'plugins/scalable/ScalableDefaultsType';
import { IScalable } from 'plugins/scalable/IScalable';

export interface ScalableConstructorParams {
  id: string;
  domManipulationType?: DOMManipulationType;
  title: string;
  propertyName: string;
  propertyUnit?: string;
  nodeTypes: TextNodeType;
  defaults: ScalableDefaultsType;
  displayValue: (plugin: IScalable, props: any) => string;
  onUpdate: (plugin: IScalable, props: any) => void;
}
