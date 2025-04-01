/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academic-semester/academic.semester.interface';
import { AcademicSemester } from '../academic-semester/academic.semester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { getAdminId, getFacultyId, getStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academic-department/academic-department.model';
import { Faculty } from '../faculty/faculty.model';
import { Admin } from '../admin/admin.model';
import { JwtPayload } from 'jsonwebtoken';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  userData.email = payload?.email;

  const admissionSemester = await AcademicSemester.findById(
    payload.academicSemester,
  );

  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await getStudentId(admissionSemester as TAcademicSemester);

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    // await session.endSession();

    return newStudent[0];
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error(error);
  } finally {
    session.endSession();
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'faculty';
  userData.email = payload?.email;

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await getFacultyId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();

    return newFaculty[0];
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error(error);
  } finally {
    session.endSession();
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'admin';
  userData.email = payload?.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await getAdminId();

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();

    return newAdmin[0];
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error(error);
  } finally {
    session.endSession();
  }
};

const getMeFromDB = async (payload: JwtPayload) => {
  const { role, userId } = payload;

  let result = null;

  if (role === 'student') {
    result = await Student.findOne({ id: userId })
      .populate('user')
      .populate('academicSemester')
      .populate('academicDepartment');
  }

  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId })
      .populate('user')
      .populate('academicDepartment');
  }

  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatusIntoDB = async (id: string, status: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    {
      status,
    },
    { new: true },
  );

  return result;
};

export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDB,
  changeStatusIntoDB,
};
