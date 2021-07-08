import CSteps, { ICStep } from 'components/CSteps';
import JobMeta from './JobMeta';
import UploadFiles from './UploadFiles';
import TagsGroup from './TagsGroup/TagsGroup';
import { JobMetaAction, UploadFileAction, TagsGroupAction } from './NextActions';

// action is just function when next is being clicked
const steps: ICStep[] = [
  {
    title: 'Paste Job Description',
    content: <JobMeta />,
    action: JobMetaAction,
  },
  {
    title: 'Add relevant Tags',
    content: <TagsGroup />,
    action: TagsGroupAction,
  },
  {
    title: 'Upload Resumes',
    content: <UploadFiles />,
    action: UploadFileAction,
  },
];

const UploadSteps: React.FC = () => {
  return <CSteps steps={steps} />;
};
export default UploadSteps;
