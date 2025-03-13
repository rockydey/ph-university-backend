import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academic-semester/academic.semester.route';
import { AcademicFacultyRoutes } from '../modules/academic-faculty/academic.faculty.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
