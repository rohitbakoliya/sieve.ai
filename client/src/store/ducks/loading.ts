import { IAction } from 'store/types';

const reducer = (state = {}, action: IAction) => {
  const { type } = action;
  const matches = type.match(/(.*)_(REQUEST|SUCCESS|FAILURE)/);

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;
  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving *_REQUEST
    [requestName]: requestState === 'REQUEST',
  };
};
export default reducer;
