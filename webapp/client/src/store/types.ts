import { AuthReducerState, IStepsContent } from './ducks';

export interface StoreState {
  auth: AuthReducerState;
  stepsContent: IStepsContent;
  loading: {
    [x: string]: boolean;
  };
  error: {
    [x: string]: string;
  };
}

export interface IAction {
  type: string;
  payload?: any;
}

export const API = 'API';

export const ApiActionCreator = (
  actionName: string
): {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
} => ({
  REQUEST: `${actionName}_REQUEST`,
  SUCCESS: `${actionName}_SUCCESS`,
  FAILURE: `${actionName}_FAILURE`,
});
