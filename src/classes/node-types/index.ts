export interface INodeType {
  id: string;

  /**
   * List of HTMLElement tags applicable to this node type.
   * e.g. ['p', 'a', 'h1', ...] may be applicable to the `TextNodeType`.
   *
   * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element
   */
  types: string[];
}

interface NodeTypeParams {
  id: string;
  types: string[];
}

export default class NodeType implements INodeType {
  public id: string = '';
  public types: string[] = [];

  /**
   * Gets the collection of relevant HTMLElements based on the `types` array.
   *
   * @returns {NodeList<HTMLElement>}
   */
  public nodes(): NodeList {
    return document.querySelectorAll(this.types.join(', '));
  }
}
