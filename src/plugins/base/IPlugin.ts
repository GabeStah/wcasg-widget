import { DOMManipulationType } from '@/plugins';

export interface IPlugin {
  id: string;
  title: string;
  dataAttributeName: string;
  domManipulationType: DOMManipulationType;
  initialState: object;

  onMount(props: object): void;
  toComponent(): any;
}
