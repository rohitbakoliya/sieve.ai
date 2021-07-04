import { IAction } from 'store';
import { ApiAction } from 'store/middlewares/apiMiddleware';
import { API, ApiActionCreator } from 'store/types';
import { CLEAR_ALL_ERRORS } from './errors';

// Actions
export const AUTH_SET_USER = 'auth/SET_USER';

export const SIGNUP = ApiActionCreator('user/SIGN_UP');
export const LOGIN = ApiActionCreator('user/LOGIN');
export const LOGOUT = ApiActionCreator('user/LOGOUT');
export const CHECK_AUTH = ApiActionCreator('auth/CHECK_AUTH');

export interface UserProps {
  name: string;
  email: string;
  id: string;
}

export interface AuthReducerState {
  isAuthenticated: boolean;
  user: Partial<UserProps> | null;
}

const DEFAULT_STATE: AuthReducerState = {
  isAuthenticated: false,
  user: {},
};

// Reducer - default export
const reducer = (state = DEFAULT_STATE, action: IAction): AuthReducerState => {
  switch (action.type) {
    case CHECK_AUTH.SUCCESS:
      return { ...state, user: action.payload, isAuthenticated: true };
    case LOGOUT.SUCCESS:
      return { ...state, user: null, isAuthenticated: false };
    case LOGIN.SUCCESS:
      return { ...state, user: action.payload, isAuthenticated: true };
    default:
      return state;
  }
};
export default reducer;

// Action Creators - export

// Side-effects - export
export const checkAuth = (): ApiAction => ({
  type: API,
  payload: {
    method: 'GET',
    url: '/api/auth/check-auth',
    formData: null,
  },
  onRequest: CHECK_AUTH.REQUEST,
  onSuccess: CHECK_AUTH.SUCCESS,
  onFailure: CHECK_AUTH.FAILURE,
});

export const signupUser = (formData: any): ApiAction => ({
  type: API,
  payload: {
    method: 'POST',
    url: '/api/auth/signup',
    formData,
  },
  onRequest: SIGNUP.REQUEST,
  onSuccess: (dispatch, data) => {
    dispatch({ type: CLEAR_ALL_ERRORS });
    dispatch({ type: SIGNUP.SUCCESS });
  },
  onFailure: (dispatch, err) => {
    dispatch({ type: SIGNUP.FAILURE, payload: err });
    dispatch({ type: LOGOUT.SUCCESS });
    dispatch({ type: CLEAR_ALL_ERRORS });
  },
});

export const loginUser = (formData: { email: string; password: string }): ApiAction => ({
  type: API,
  payload: {
    method: 'POST',
    url: '/api/auth/login',
    formData,
  },
  onRequest: LOGIN.REQUEST,
  onSuccess: (dispatch, data) => {
    dispatch({ type: LOGIN.SUCCESS, payload: data });
    dispatch({ type: CLEAR_ALL_ERRORS });
  },
  onFailure: (dispatch, err) => {
    dispatch({ type: LOGIN.FAILURE, payload: err });
    dispatch({ type: LOGOUT.SUCCESS });
    dispatch({ type: CLEAR_ALL_ERRORS });
  },
});

export const logoutUser = (): ApiAction => ({
  type: API,
  payload: {
    method: 'GET',
    url: 'api/auth/logout',
    formData: null,
  },
  onRequest: LOGOUT.REQUEST,
  onSuccess: (dispatch, data) => {
    dispatch({ type: LOGOUT.SUCCESS, payload: data });
  },
  onFailure: (dispatch, err) => {
    dispatch({ type: LOGOUT.FAILURE, payload: err });
  },
});
