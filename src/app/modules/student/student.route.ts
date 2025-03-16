import { Router } from 'express';
import { StudentController } from './student.controller';

const router = Router();

router.get('/', StudentController.getAllStudent);

router.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = router;
