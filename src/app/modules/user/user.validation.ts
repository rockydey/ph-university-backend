import { z } from 'zod';
import { USER_STATUS } from './user.constant';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...USER_STATUS] as [string, ...string[]], {
      required_error: 'Status is required',
    }),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
