import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseController } from './course.controller';

const router = Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get('/', CourseController.getAllCourses);

router.get('/:id', CourseController.getSingleCourse);

router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
