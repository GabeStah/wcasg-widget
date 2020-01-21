import NodeType from './';

export default class TextNodeType extends NodeType {
  public id: string = 'text-node-type';
  public types: string[] = [
    'p',
    'li',
    'label',
    'input',
    'select',
    'textarea',
    'legend',
    'code',
    'pre',
    'dd',
    'dt',
    'span',
    'blockquote',
    'a',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6'
  ];
}
