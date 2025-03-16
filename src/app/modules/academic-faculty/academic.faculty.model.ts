import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academic.faculty.interface';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isFacultyExist = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isFacultyExist) {
    throw new AppError(httpStatus.CONFLICT, 'Faculty already exists');
  }

  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isFacultyExist = await AcademicFaculty.findOne(query);

  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
