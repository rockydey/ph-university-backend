import { Router } from 'express';
import { FacultyController } from './faculty.controller';

const router = Router();

router.get('/', FacultyController.getAllFaculties);

router.get('/:id', FacultyController.getSingleFaculty);

router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
