import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 100, // since hased password can be longer than our 50 length limit
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    provider: { type: [String], enum: ['google', 'local'], required: true },
    googleId: { type: String },
  },
  { timestamps: true }
);

UserSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;
  },
});

UserSchema.pre('save', function (next) {
  if (!this.provider.includes('local')) next();
  // to only hash password when user signed up or update their password
  if (this.isModified('password') || this.isNew) {
    try {
      // Hash Password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return next();
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    // Check/Compares password
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const User = mongoose.model('User', UserSchema);

export default User;
