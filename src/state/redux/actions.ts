import { createActionCreators } from 'immer-reducer';
import findIndex from 'lodash/findIndex';
import { BaseReducer } from 'state/redux/reducers';

const getOptionIndexById = (plugin: any, id: any) => {
  return findIndex(plugin.options, (option: any) => option.id === id);
};

export const ActionCreators = createActionCreators(BaseReducer);
