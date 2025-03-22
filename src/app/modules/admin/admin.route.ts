import { Router } from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';

const router = Router();

router.get('/', AdminController.getAllAdmins);

router.get('/:id', AdminController.getSingleAdmin);

router.delete('/:id', AdminController.deleteAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminValidationSchema),
  AdminController.updateAdmin,
);

export const AdminRoutes = router;
