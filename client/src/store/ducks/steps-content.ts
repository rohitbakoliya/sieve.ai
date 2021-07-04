import { IAction } from 'store';
import { ApiAction } from 'store/middlewares/apiMiddleware';
import { API, ApiActionCreator } from 'store/types';

export const CREATE_JOB = ApiActionCreator('steps-content/CREATE_JOB');
export const GET_RESULTS = ApiActionCreator('steps-content/GET_RESULTS');
export const TAGS_SUGGESTION = ApiActionCreator('steps-content/TAGS_SUGGESTION');

export const ADD_JD = 'steps-content/ADD_JD';
export const ADD_JOB_NAME = 'steps-content/ADD_JOB_NAME';
export const ADD_TAGS = 'steps-content/ADD_TAGS';
export const ADD_RESUME = 'steps-content/ADD_RESUME';
export const ADD_PROFIL = 'steps-content/ADD_PROFIL';
export const RESET_ALL = 'steps-content/RESET_ALL';

export interface IStepsContent {
  jd: string;
  profile: string[];
  tags: string[];
  resumes: string[];
}

const DEFAULT_STATE: IStepsContent = {
  jd: '',
  profile: [],
  tags: [],
  resumes: [],
};

// Reducer - default export
const reducer = (state = DEFAULT_STATE, action: IAction): IStepsContent => {
  switch (action.type) {
    case ADD_JD:
      return { ...state, jd: action.payload };
    case ADD_TAGS:
      return { ...state, tags: action.payload };
    case ADD_PROFIL:
      return { ...state, profile: action.payload };
    case ADD_RESUME:
      return { ...state, resumes: [...state.resumes, action.payload] };
    case RESET_ALL:
      return { ...DEFAULT_STATE };
    default:
      return state;
  }
};
export default reducer;

// Action Creators
export const addJd = (jd: string): IAction => {
  return { type: ADD_JD, payload: jd };
};

export const addTags = (tags: any[]): IAction => {
  return { type: ADD_TAGS, payload: tags };
};

export const addResume = (resumes: string): IAction => {
  return { type: ADD_RESUME, payload: resumes };
};

export const addProfile = (profile: string[]): IAction => {
  return { type: ADD_PROFIL, payload: profile };
};

interface IJobData {
  jd: string;
  profile: string[];
  resumes: string[];
  tags: string[];
}
export const createJob = (formData: IJobData): ApiAction => ({
  type: API,
  payload: {
    method: 'POST',
    url: `/api/jobs`,
    formData,
  },
  onRequest: CREATE_JOB.REQUEST,
  onSuccess: (dispatch, data) => {
    dispatch({ type: CREATE_JOB.SUCCESS, payload: data });
    dispatch({ type: RESET_ALL });
  },
  onFailure: (dispatch, err) => {
    dispatch({ type: CREATE_JOB.FAILURE, payload: err });
  },
});

// @deprecated
export const getResults = (formData): ApiAction => ({
  type: API,
  payload: {
    method: 'POST',
    url: `/api/jobs/:jobId/results`,
    formData,
  },
  onRequest: GET_RESULTS.REQUEST,
  onSuccess: (dispatch, data) => {
    dispatch({ type: GET_RESULTS.SUCCESS, payload: data });
  },
  onFailure: (dispatch, err) => {
    dispatch({ type: GET_RESULTS.FAILURE, payload: err });
  },
});
