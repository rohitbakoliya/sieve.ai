import CSteps, { ICStep } from 'components/CSteps';
import JdTextArea from './JdTextarea';
import UploadFiles from './UploadFiles';
import TagsGroup from './TagsGroup';
import { JdTextareaAction, UploadFileAction, TagsGroupAction} from './NextActions';

// action is just function when next is being clicked
const steps: ICStep[] = [
  {
    title: 'Paste Job Description',
    content: <JdTextArea />,
    action: JdTextareaAction,
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
