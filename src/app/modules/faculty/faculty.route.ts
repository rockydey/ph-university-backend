import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';

const router = Router();

router.get('/', FacultyController.getAllFaculties);

router.get('/:id', FacultyController.getSingleFaculty);

router.delete('/:id', FacultyController.deleteFaculty);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

export const FacultyRoutes = router;
