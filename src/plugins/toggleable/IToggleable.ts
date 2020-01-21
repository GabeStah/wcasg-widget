import { IPlugin } from 'plugins/base/IPlugin';
import { ToggleableComponentProps } from 'components/toggleable';
import BodyNodeType from 'classes/node-types/BodyNodeType';
import { IToggleableState } from 'plugins/toggleable/IToggleableState';
import { ToggleableDefaultsType } from 'plugins/toggleable/ToggleableDefaultsType';

export interface IToggleable extends IPlugin {
  defaults: ToggleableDefaultsType;
  displayValue: (
    plugin: IToggleable,
    props: ToggleableComponentProps
  ) => string;
  id: string;
  nodes: NodeList | null | undefined;
  nodeTypes: BodyNodeType;
  onUpdate: (plugin: IToggleable, props: ToggleableComponentProps) => void;
  propertyName: string;
  propertyUnit: string;
  state: IToggleableState;
  style: any;
  title: string;
  dataAttributeName: string;
}
