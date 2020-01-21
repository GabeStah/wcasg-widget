import { DOMManipulationType } from '@/plugins';
import BodyNodeType from 'classes/node-types/BodyNodeType';
import { ToggleableDefaultsType } from 'plugins/toggleable/ToggleableDefaultsType';
import { IToggleable } from 'plugins/toggleable/IToggleable';
import { ToggleableComponentProps } from 'components/toggleable';

export interface ToggleableConstructorParams {
  id: string;
  title: string;
  domManipulationType: DOMManipulationType;
  propertyName: string;
  propertyUnit: string;
  nodeTypes: BodyNodeType;
  defaults: ToggleableDefaultsType;
  displayValue: (
    plugin: IToggleable,
    props: ToggleableComponentProps
  ) => string;
  onUpdate: (plugin: IToggleable, props: ToggleableComponentProps) => void;
}
