import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from '../student/student.validation';
import { FacultyValidation } from '../faculty/faculty.validation';
import { AdminValidation } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminValidationSchema),
  UserController.createAdmin,
);

export const UserRoutes = router;
