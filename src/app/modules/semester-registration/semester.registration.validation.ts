import { z } from 'zod';
import { SemesterRegistrationStatus } from './semester.registration.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string({
      required_error: 'Academic Semester is required',
    }),
    status: z
      .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
      .default('UPCOMING'),
    startDate: z
      .string({ required_error: 'Start date is required' })
      .datetime(),
    endDate: z.string({ required_error: 'End date is required' }).datetime(),
    minCredit: z.number().default(3),
    maxCredit: z.number().default(15),
  }),
});

const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z
      .string({
        required_error: 'Academic Semester is required',
      })
      .optional(),
    status: z
      .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
      .default('UPCOMING')
      .optional(),
    startDate: z
      .string({ required_error: 'Start date is required' })
      .datetime()
      .optional(),
    endDate: z
      .string({ required_error: 'End date is required' })
      .datetime()
      .optional(),
    minCredit: z.number().default(3).optional(),
    maxCredit: z.number().default(15).optional(),
  }),
});

export const SemesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
