import { createConnector } from 'state/redux/store';

export const Connector = createConnector({
  mapState: selectors => selectors.state,

  mapActions: (actions, props) => ({
    decrement(id: string) {
      actions.decrement({ id });
    },
    disable(id: string) {
      actions.disable({ id });
    },
    disableKeyboard() {
      actions.disableKeyboard();
    },
    enable(id: string) {
      actions.enable({ id });
    },
    enableKeyboard() {
      actions.enableKeyboard();
    },
    focusNode(node: any) {
      actions.focusNode({ node });
    },
    increment(id: string) {
      actions.increment({ id });
    },
    keyDown(key: string) {
      actions.keyDown({ key });
    },
    keyUp(key: string) {
      actions.keyUp({ key });
    },
    reset() {
      actions.reset();
    },
    selectOption(id: string, selectId: number) {
      actions.selectOption({ id, selectId });
    }
  })
});