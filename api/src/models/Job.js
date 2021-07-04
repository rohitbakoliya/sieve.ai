import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    jd: {
      type: String,
      required: true,
      trim: true,
      maxLength: 4000,
    },
    profile: {
      type: [String],
      required: true,
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
        userInfo: Object,
        score: {
          type: Number,
          min: 0,
          max: 100,
        },
        resumeId: String,
        tagsScore: Object,
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
