import { Router } from 'express';
import { FacultyController } from './faculty.controller';

const router = Router();

router.get('/', FacultyController.getAllFaculties);

export const FacultyRoutes = router;
