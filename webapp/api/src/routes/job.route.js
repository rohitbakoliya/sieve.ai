import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  getJobResultsById,
} from '../controllers/job.controller';
const router = express.Router();

router.get('/', getAllJobs);

router.get('/:jobId/results', getJobResultsById);

router.get('/:jobId', getJobById);

router.post('/', createJob);

export default router;
