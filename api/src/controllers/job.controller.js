import Job from '../models/Job';
import httpStatus from 'http-status-codes';

/**
 * @desc    To get all the jobs created by a user
 * @route   GET /api/jobs
 * @access  private
 */
export const getAllJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobs = await Job.find({ userId });
    return res.status(httpStatus.OK).json({ data: jobs });
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while fetching your jobs' });
  }
};

/**
 * @desc    To create new Job
 * @route   POST /api/jobs
 * @access  private
 */
export const createJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const job = new Job({
      ...req.body,
      userId,
    });
    const savedJob = await job.save();
    return res.status(httpStatus.CREATED).json({ data: savedJob });
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong while creating job' });
  }
};

/**
 * @desc    To get job info by Id
 * @route   GET /api/jobs/:jobId
 * @access  private
 */
export const getJobById = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: `No job exists with JobId:${jobId} in our records` });
    }
    return res.status(httpStatus.OK).json({ data: job });
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'something went wrong getting job' });
  }
};
