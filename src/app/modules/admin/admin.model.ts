import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin, TUserName } from './admin.interface';
import { BloodGroup, Gender } from './admin.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: userNameSchema,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{Value} is not a valid gender',
      },
      trim: true,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contactNo: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
      trim: true,
    },
    presentAddress: {
      type: String,
      required: true,
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: true,
      trim: true,
    },
    profileImg: {
      type: String,
      required: false,
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{Value} is not valid blood group',
      },
      required: false,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

adminSchema.virtual('fullName').get(function () {
  return (
    this?.name?.firstName +
    ' ' +
    (this?.name?.middleName ? this?.name?.middleName : '') +
    ' ' +
    this?.name?.lastName
  );
});

adminSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//checking if user is already exist!
adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findById(id);
  return existingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
