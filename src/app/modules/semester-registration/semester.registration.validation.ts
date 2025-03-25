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

export const SemesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
};
