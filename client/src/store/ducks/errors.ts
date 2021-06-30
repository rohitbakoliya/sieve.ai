import { IAction } from 'store/types';

export const CLEAR_ALL_ERRORS = 'CLEAR_ALL_ERRORS';

const reducer = (state = {}, action: IAction) => {
  const { type, payload } = action;
  if (type === CLEAR_ALL_ERRORS) return {};
  const matches = type.match(/(.*)_(REQUEST|FAILURE)/);

  // ignore if action type is not *_REQUEST or *_FAILURE
  if (!matches) return state;
  const [, requestName, requestState] = matches;
  return {
    ...state,
    // add error message when *_FAILURE occurs
    // otherwise clear error
    [requestName]: requestState === 'FAILURE' ? payload : '',
  };
};
export default reducer;
