import config from '../../config';
import { TAcademicSemester } from '../academic-semester/academic.semester.interface';
import { AcademicSemester } from '../academic-semester/academic.semester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { getStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<IUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    payload.academicSemester,
  );
  userData.id = await getStudentId(admissionSemester as TAcademicSemester);

  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
