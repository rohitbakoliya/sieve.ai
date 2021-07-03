import { IAction } from 'store';
import { ApiAction } from 'store/middlewares/apiMiddleware';
import { API, ApiActionCreator } from 'store/types';

export const TAGS_SUGGESTION = ApiActionCreator('steps-content/TAGS_SUGGESTION');

export const ADD_JD = 'steps-content/ADD_JD';
export const ADD_TAGS = 'steps-content/ADD_TAGS';
export const ADD_RESUMES = 'steps-content/ADD_RESUMES';

export interface IStepsContent {
  jd: string;
  suggestedTags: any[];
  tags: any[];
  resumes: any[];
}

const DEFAULT_STATE: IStepsContent = {
  jd: '',
  suggestedTags: [],
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
    case ADD_RESUMES:
      return { ...state, resumes: action.payload };
    case TAGS_SUGGESTION.SUCCESS:
      return { ...state, suggestedTags: action.payload };
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

export const addResumes = (resumes: any[]): IAction => {
  return { type: ADD_RESUMES, payload: resumes };
};

export const getTagsSuggestion = (formData: { jd: string }): ApiAction => ({
  type: API,
  payload: {
    method: 'POST',
    url: '/api/tags-suggestion',
    formData,
  },
  onRequest: TAGS_SUGGESTION.REQUEST,
  onSuccess: (dispatch, data) => {
    dispatch({ type: TAGS_SUGGESTION.SUCCESS, payload: data });
  },
  onFailure: (dispatch, err) => {
    dispatch({ type: TAGS_SUGGESTION.FAILURE, payload: err });
  },
});

export const getResults = (formData): ApiAction => ({
  type: API,
  payload: {
    method: 'POST',
    url: '/api/tags-suggestion',
    formData,
  },
  onRequest: TAGS_SUGGESTION.REQUEST,
  onSuccess: (dispatch, data) => {
    dispatch({ type: TAGS_SUGGESTION.SUCCESS, payload: data });
  },
  onFailure: (dispatch, err) => {
    dispatch({ type: TAGS_SUGGESTION.FAILURE, payload: err });
  },
});
