import { Router } from 'express';
import { AcademicSemesterController } from './academic.semester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academic.semester.validation';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);

router.get(
  '/:semesterId',
  AcademicSemesterController.getSingleAcademicSemester,
);

export const AcademicSemesterRoutes = router;
