import { Router } from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', auth('admin', 'faculty'), StudentController.getAllStudent);

router.delete(
  '/:id',
  auth('faculty', 'admin'),
  StudentController.deleteStudent,
);

router.patch(
  '/:id',
  auth('admin', 'student'),
  validateRequest(StudentValidation.updateStudentValidationSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
