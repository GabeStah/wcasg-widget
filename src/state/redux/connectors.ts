import { createPluginConnector } from 'state/redux/store';

export const PluginConnect = createPluginConnector({
  mapState: (selectors, props: { id: string }) => selectors.getPlugin(props.id),

  mapActions: (actions, props) => ({
    toggle() {
      actions.toggle({ id: props.id });
    },
    enable() {
      actions.enable({ id: props.id });
    },
    disable() {
      actions.disable({ id: props.id });
    },
    increment() {
      actions.increment({ id: props.id });
    },
    decrement() {
      actions.decrement({ id: props.id });
    },
    reset() {
      actions.reset();
    }
    // setText(text: string) {
    //   actions.setTodoText({ id: props.id, text });
    // },
    //
    // complete() {
    //   actions.completeTodo({ id: props.id });
    // },
    // revert() {
    //   actions.revertTodo({ id: props.id });
    // }
  })
});
