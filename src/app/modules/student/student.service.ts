import mongoose from 'mongoose';
import { Student } from './student.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };
  // // ==> Searching
  // let searchTerm = '';
  // if (query.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: ['email', 'presentAddress', 'name.firstName', 'name.lastName'].map(
  //     (field) => ({
  //       [field]: { $regex: searchTerm, $options: 'i' },
  //     }),
  //   ),
  // });
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((field) => delete queryObj[field]);
  // // ==> filtering
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('user')
  //   .populate('academicSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });
  // // ==> sorting
  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);
  // // ==> pagination & limiting
  // let limit = 10;
  // let page = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = parseInt(query.limit as string);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginationQuery = sortQuery.skip(skip);
  // const limitQuery = paginationQuery.limit(limit);
  // // ==> fields
  // let fields = '-__v';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const fieldsQuery = await limitQuery.select(fields);
  // return fieldsQuery;

  const studentQuery = new QueryBuilder<TStudent>(
    Student.find()
      .populate('user')
      .populate('academicSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.queryModel;

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // const isUserExist = await User.findById(id).session(session);
    // if (!isUserExist) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
    // }

    const isStudentExist = await Student.findById(id).session(session);
    if (!isStudentExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'Student does not exist');
    }

    const deleteStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user id from deleted student
    const userId = deleteStudent.user;

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();

    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...studentData } = payload;

  const modifiedStudentData: Record<string, unknown> = {
    ...studentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudentData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudentData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudentData[`localGuardian.${key}`] = value;
    }
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    id,
    modifiedStudentData,
    { new: true, runValidators: true },
  );
  return updatedStudent;
};

export const StudentService = {
  getAllStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
