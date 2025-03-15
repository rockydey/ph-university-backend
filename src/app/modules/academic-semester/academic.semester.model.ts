import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academic.semester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Month,
} from './academic.semester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: AcademicSemesterName, required: true },
    code: { type: String, enum: AcademicSemesterCode, required: true },
    year: { type: String, required: true },
    startMonth: {
      type: String,
      enum: Month,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Month,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExist) {
    throw new Error('Academic Semester is already exist');
  }
  next();
});

academicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isSemesterExist = await AcademicSemester.findOne(query);

  if (!isSemesterExist) {
    throw new Error('Semester not found');
  }

  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
