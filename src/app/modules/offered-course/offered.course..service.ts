import { TOfferedCourse } from './offered.course.interface';
import { OfferedCourse } from './offered.course.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const result = await OfferedCourse.create(payload);
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
};
