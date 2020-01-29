import { createActionCreators, ImmerReducer } from 'immer-reducer';
import { defaultState, State } from 'state/redux/state';

export class PluginReducer extends ImmerReducer<State> {
  public toggle(payload: { id: string }) {
    this.draftState.plugins[payload.id].enabled = !this.draftState.plugins[
      payload.id
    ].enabled;
  }

  public enable(payload: { id: string }) {
    this.draftState.plugins[payload.id].enabled = true;
  }

  public disable(payload: { id: string }) {
    this.draftState.plugins[payload.id].enabled = false;
  }

  public increment(payload: { id: string }) {
    const current = this.draftState.plugins[payload.id].scalingFactor;
    this.draftState.plugins[payload.id].scalingFactor = current
      ? current + 1
      : 1;
  }

  public decrement(payload: { id: string }) {
    const current = this.draftState.plugins[payload.id].scalingFactor;
    this.draftState.plugins[payload.id].scalingFactor = current
      ? current - 1
      : -1;
  }

  public reset() {
    this.draftState = defaultState;
  }
}

export const PluginActions = createActionCreators(PluginReducer);
