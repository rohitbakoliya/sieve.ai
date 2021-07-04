import { store } from 'store';
import { getResults, getTagsSuggestion } from 'store/ducks';

// action handlers
export const JobMetaAction = async () => {
  const jd = store.getState().stepsContent.jd;

  try {
    await store.dispatch(getTagsSuggestion({ jd }));
  } catch (err) {
    console.log(err);
  }
};

export const TagsGroupAction = () => {};

export const UploadFileAction = async () => {
  const { jd, jobName, resumes, suggestedTags, tags } = store.getState().stepsContent;
  const payload = {
    jd,
    jobName,
    resumes,
    tags: [...suggestedTags, ...tags],
  };
  const { id } = await store.dispatch(getResults(payload));
  return {
    location: `/results/${id}`,
  };
};
