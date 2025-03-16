import { Student } from './student.model';

const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate('user')
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

export const StudentService = {
  getAllStudentFromDB,
};
