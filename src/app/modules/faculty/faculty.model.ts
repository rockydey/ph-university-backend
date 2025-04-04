import { model, Schema } from 'mongoose';
import { FacultyModel, TFaculty, TUserName } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';

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

const facultySchema = new Schema<TFaculty, FacultyModel>(
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
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
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

facultySchema.virtual('fullName').get(function () {
  return [this?.name?.firstName, this?.name?.middleName, this?.name?.lastName]
    .filter(Boolean) // Removes undefined, null, or empty strings
    .join(' ');
});

facultySchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//checking if user is already exist!
facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findById(id);
  return existingUser;
};

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
