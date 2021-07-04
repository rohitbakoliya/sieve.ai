import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    jobName: {
      type: String,
      trim: true,
      required: true,
    },
    jd: {
      type: String,
      required: true,
      trim: true,
      maxLength: 4000,
    },
    tags: {
      type: [String],
      required: true,
    },
    resumes: {
      type: [String],
      required: true,
    },
    processed: { type: Boolean, default: false },
    results: [
      {
        name: String,
        email: String,
        score: {
          type: Number,
          min: 0,
          max: 100,
        },
        resume: {
          link: String,
          rid: String,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

JobSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Job = mongoose.model('Job', JobSchema);

export default Job;
