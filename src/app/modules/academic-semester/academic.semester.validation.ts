import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Month,
} from './academic.semester.constant';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
      required_error: 'Name is required',
    }),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    startMonth: z.enum([...Month] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...Month] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};
