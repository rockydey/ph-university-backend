import { z } from 'zod';
import { Days } from './offered.course.constant';

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string({
        required_error: 'Semester registration is required',
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
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string({ required_error: 'Start time is required' }).refine(
        (time) => {
          const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return regex.test(time);
        },
        {
          message: "Expected 'HH:MM' in 24 hours format",
        },
      ),
      endTime: z.string({ required_error: 'End time is required' }).refine(
        (time) => {
          const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
          return regex.test(time);
        },
        {
          message: "Expected 'HH:MM' in 24 hours format",
        },
      ),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      { message: 'Start time should be before End time' },
    ),
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
