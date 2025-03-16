import { Router } from 'express';
import { StudentController } from './student.controller';

const router = Router();

router.get('/', StudentController.getAllStudent);

export const StudentRoutes = router;
