import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from '../student/student.validation';
import { FacultyValidation } from '../faculty/faculty.validation';
import { AdminValidation } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/uploadImage';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(StudentValidation.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidation.createAdminValidationSchema),
  UserController.createAdmin,
);

router.get('/me', auth('student', 'faculty', 'admin'), UserController.getMe);

router.patch(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);

export const UserRoutes = router;
