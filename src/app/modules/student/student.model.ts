import { model, Schema } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TName,
  TStudent,
} from './student.interface';

const nameSchema = new Schema<TName>({
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true, trim: true },
  fatherOccupation: { type: String, required: true, trim: true },
  fatherContactNo: { type: String, required: true, trim: true },
  motherName: { type: String, required: true, trim: true },
  motherOccupation: { type: String, required: true, trim: true },
  motherContactNo: { type: String, required: true, trim: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true, trim: true },
  occupation: { type: String, required: true, trim: true },
  contactNo: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
});

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    name: { type: nameSchema, required: true },
    gender: {
      type: String,
      enum: ['male', 'female'],
      trim: true,
      required: true,
    },
    dateOfBirth: { type: Date, required: true },
    contactNo: { type: String, required: true, trim: true },
    emergencyContactNo: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    presentAddress: { type: String, required: true, trim: true },
    permanentAddress: { type: String, required: true, trim: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImg: { type: String, trim: true },
    isDeleted: { type: Boolean, default: false },
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicSemester',
    },
  },
  {
    timestamps: true,
  },
);

export const Student = model<TStudent>('Student', studentSchema);
