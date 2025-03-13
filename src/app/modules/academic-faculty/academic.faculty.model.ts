import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academic.faculty.interface';

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

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
