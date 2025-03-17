import { Router } from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';

const router = Router();

router.get('/', StudentController.getAllStudent);

router.delete('/:studentId', StudentController.deleteStudent);

router.patch(
  '/:studentId',
  validateRequest(StudentValidation.updateStudentValidationSchema),
  StudentController.updateStudent,
);

export const StudentRoutes = router;
