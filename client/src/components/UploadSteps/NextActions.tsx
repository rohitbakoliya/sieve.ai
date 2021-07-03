import { store } from 'store';
import { getTagsSuggestion } from 'store/ducks';

// action handlers
export const JdTextareaAction = async () => {
  const jd = store.getState().stepsContent.jd;
  try {
    await store.dispatch(getTagsSuggestion({ jd }));
  } catch (err) {
    console.log(err);
  }
};

export const TagsGroupAction = () => {};

export const UploadFileAction = () => ({
  location: '/results',
});
