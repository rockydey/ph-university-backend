import { z } from 'zod';

const userValidationSchema = z.object({
  id: z
    .string({
      message: 'ID is required',
    })
    .trim(),

  password: z
    .string({
      message: 'Password is required',
    })
    .min(8, { message: 'Password must be at least 8 characters long' }),

  role: z.enum(['student', 'faculty', 'admin'], {
    message: 'Role must be one of student, faculty, or admin',
  }),

  status: z
    .enum(['active', 'blocked'], {
      message: 'Status must be one of active or blocked',
    })
    .default('active'),

  isDeleted: z.boolean().default(false),

  needsPasswordChange: z.boolean().default(true),
});

export const UserValidation = { userValidationSchema };
