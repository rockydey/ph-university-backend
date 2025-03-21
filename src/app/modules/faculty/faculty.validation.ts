import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.constant';

const createUserNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }).trim(),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: 'Last name is required' }).trim(),
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(8, { message: 'Password must be at least 8 characters long' })
      .optional(),
  }),
  faculty: z.object({
    designation: z.string({
      required_error: 'Designation is required',
    }),
    name: createUserNameValidationSchema,
    gender: z.enum([...Gender] as [string, ...string[]], {
      required_error: 'Gender is required',
    }),
    dateOfBirth: z.string().optional(),
    email: z.string({ required_error: 'Email is required' }).email(),
    contactNo: z.string({ required_error: 'Contact no is required' }),
    emergencyContactNo: z.string({
      required_error: 'Emergency contact no is required',
    }),
    presentAddress: z.string({
      required_error: 'Present address is required',
    }),
    permanentAddress: z.string({
      required_error: 'Permanent address is required',
    }),
    profileImg: z.string().optional(),
    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
    academicDepartment: z.string({
      required_error: 'Academic department is required',
    }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .trim()
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .trim()
    .optional(),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(8, { message: 'Password must be at least 8 characters long' })
      .optional(),
  }),
  faculty: z.object({
    designation: z
      .string({
        required_error: 'Designation is required',
      })
      .optional(),
    name: updateUserNameValidationSchema.optional(),
    gender: z
      .enum([...Gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      })
      .optional(),
    dateOfBirth: z.string().optional(),
    email: z.string({ required_error: 'Email is required' }).email().optional(),
    contactNo: z
      .string({ required_error: 'Contact no is required' })
      .optional(),
    emergencyContactNo: z
      .string({
        required_error: 'Emergency contact no is required',
      })
      .optional(),
    presentAddress: z
      .string({
        required_error: 'Present address is required',
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: 'Permanent address is required',
      })
      .optional(),
    profileImg: z.string().optional(),
    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
    academicDepartment: z
      .string({
        required_error: 'Academic department is required',
      })
      .optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const FacultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
