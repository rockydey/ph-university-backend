import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidation } from './offered.course.validation';
import { OfferedCourseController } from './offered.course.controller';

const router = Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);

router.get('/', OfferedCourseController.getAllOfferedCourse);

router.get('/:id', OfferedCourseController.getSingleOfferedCourse);

export const OfferedCourseRoutes = router;
