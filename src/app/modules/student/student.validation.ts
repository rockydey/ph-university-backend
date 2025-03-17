import { z } from 'zod';

const createNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: 'Last name is required' }),
});

const updateNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }).optional(),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: 'Last name is required' }).optional(),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string({ required_error: 'Father name is required' }),
  fatherOccupation: z.string({
    required_error: 'Father occupation is required',
  }),
  fatherContactNo: z.string({
    required_error: 'Father contact number is required',
  }),
  motherName: z.string({ required_error: 'Mother name is required' }),
  motherOccupation: z.string({
    required_error: 'Mother occupation is required',
  }),
  motherContactNo: z.string({
    required_error: 'Mother contact number is required',
  }),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z
    .string({ required_error: 'Father name is required' })
    .optional(),
  fatherOccupation: z
    .string({
      required_error: 'Father occupation is required',
    })
    .optional(),
  fatherContactNo: z
    .string({
      required_error: 'Father contact number is required',
    })
    .optional(),
  motherName: z
    .string({ required_error: 'Mother name is required' })
    .optional(),
  motherOccupation: z
    .string({
      required_error: 'Mother occupation is required',
    })
    .optional(),
  motherContactNo: z
    .string({
      required_error: 'Mother contact number is required',
    })
    .optional(),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string({ required_error: 'Local guardian name is required' }),
  occupation: z.string({
    required_error: 'Local guardian occupation is required',
  }),
  contactNo: z.string({
    required_error: 'Local guardian contact number is required',
  }),
  address: z.string({ required_error: 'Local guardian address is required' }),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z
    .string({ required_error: 'Local guardian name is required' })
    .optional(),
  occupation: z
    .string({
      required_error: 'Local guardian occupation is required',
    })
    .optional(),
  contactNo: z
    .string({
      required_error: 'Local guardian contact number is required',
    })
    .optional(),
  address: z
    .string({ required_error: 'Local guardian address is required' })
    .optional(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: createNameValidationSchema,
      // user: z.string({ required_error: 'User is required' }),
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z
        .string({ required_error: 'Date of birth is required' })
        .refine((date) => !isNaN(Date.parse(date)), {
          message: 'Invalid date format',
        }),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string({ required_error: 'Contact number is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImg: z.string().optional(),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateNameValidationSchema.optional(),
      // user: z.string({ required_error: 'User is required' }),
      gender: z
        .enum(['male', 'female'], {
          required_error: 'Gender is required',
        })
        .optional(),
      dateOfBirth: z
        .string({ required_error: 'Date of birth is required' })
        .refine((date) => !isNaN(Date.parse(date)), {
          message: 'Invalid date format',
        })
        .optional(),
      email: z
        .string({ required_error: 'Email is required' })
        .email()
        .optional(),
      contactNo: z
        .string({ required_error: 'Contact number is required' })
        .optional(),
      emergencyContactNo: z
        .string({
          required_error: 'Emergency contact number is required',
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
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional(),
      academicSemester: z
        .string({
          required_error: 'Academic semester is required',
        })
        .optional(),
      academicDepartment: z
        .string({
          required_error: 'Academic department is required',
        })
        .optional(),
    }),
  }),
});

export const StudentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
