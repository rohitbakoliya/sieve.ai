import { IAction } from 'store';

export const ADD_JD = 'steps-content/ADD_JD';
export const ADD_TAGS = 'steps-content/ADD_TAGS';
export const ADD_RESUMES = 'steps-content/ADD_RESUMES';

export interface IStepsContent {
  jd: string;
  tags: any[];
  resumes: any[];
}

const DEFAULT_STATE: IStepsContent = {
  jd: '',
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
