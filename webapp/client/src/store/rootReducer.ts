import { combineReducers } from 'redux';
import * as ducks from './ducks/index.defaults';

const rootReducer = combineReducers(ducks);

export default rootReducer;
