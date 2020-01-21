import { combineReducers } from 'redux';
import pluginReducers from './pluginReducers';

export default combineReducers({ plugins: pluginReducers });
