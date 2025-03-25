import { z } from 'zod';
import { Days } from './offered.course.constant';

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string({
      required_error: 'Semester registration is required',
    }),
    academicSemester: z.string({
      required_error: 'Academic semester is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic faculty is required',
    }),
    academicDepartment: z.string({
      required_error: 'Academic department is required',
    }),
    course: z.string({
      required_error: 'Course is required',
    }),
    faculty: z.string({
      required_error: 'Faculty is required',
    }),
    maxCapacity: z.number({ required_error: 'Max capacity is required' }),
    section: z.number({ required_error: 'Section is required' }),
    days: z.enum([...Days] as [string, ...string[]]),
    startTime: z.string({ required_error: 'Start time is required' }),
    endTime: z.string({ required_error: 'End time is required' }),
  }),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z
      .string({
        required_error: 'Faculty is required',
      })
      .optional(),
    maxCapacity: z
      .number({ required_error: 'Max capacity is required' })
      .optional(),
    days: z.enum([...Days] as [string, ...string[]]).optional(),
    startTime: z
      .string({ required_error: 'Start time is required' })
      .optional(),
    endTime: z.string({ required_error: 'End time is required' }).optional(),
  }),
});

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
