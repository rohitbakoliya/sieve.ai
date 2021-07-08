import http from 'utils/httpInstance';
import { Method } from 'axios';
import { Dispatch } from 'redux';
import { API } from '../types';

export interface ApiAction {
  type: 'API';
  payload: {
    url: string;
    method: Method;
    formData?: any;
  };
  onRequest?: string | ((dispatch: Dispatch) => void);
  onSuccess?: string | ((dispatch: Dispatch, data: any) => void);
  onFailure?: string | ((dispatch: Dispatch, err: string) => void);
  // to handling apiMiddleware promises
  [x: string]: any;
}
interface IApiProps {
  getState: any;
  dispatch: Dispatch;
}

export const ApiMiddleware =
  ({ getState, dispatch }: IApiProps) =>
  next =>
  async (action: ApiAction) => {
    const noop = () => {};
    if (action.type !== API) return next(action);
    const {
      payload: { method, url, formData },
      onRequest = noop,
      onSuccess = noop,
      onFailure = noop,
    } = action;

    if (typeof onRequest === 'function') {
      onRequest(dispatch);
    } else {
      dispatch({ type: onRequest });
    }
    try {
      // grabing data object that was originally created by axios
      let { data } = await http({
        method,
        url,
        data: formData,
      });
      // normalization of response
      data = data.data;
      if (typeof onSuccess === 'function') {
        onSuccess(dispatch, data);
      } else {
        dispatch({ type: onSuccess, payload: data });
      }
      return Promise.resolve(data);
    } catch (err) {
      if (typeof onFailure === 'function') {
        onFailure(dispatch, err);
      } else {
        dispatch({ type: onFailure, payload: err || 'Something went wrong' });
      }
      return Promise.reject(err || 'Something went wrong');
    }
  };
export default ApiMiddleware;
