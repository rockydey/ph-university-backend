import { z } from 'zod';

const createPreRequisiteCoursesValidationSchema = z.object({
  course: z.string({ required_error: 'Course is required' }),
  isDeleted: z.boolean().default(false).optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).trim(),
    prefix: z.string({ required_error: 'Prefix is required' }).trim(),
    code: z.number({ required_error: 'Code is required' }),
    credits: z.number({ required_error: 'Credit is required' }),
    isDeleted: z.boolean().default(false).optional(),
    preRequisiteCourses: z
      .array(createPreRequisiteCoursesValidationSchema)
      .optional()
      .default([]),
  }),
});

const updatePreRequisiteCoursesValidationSchema = z.object({
  course: z.string({ required_error: 'Course is required' }).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).trim().optional(),
    prefix: z
      .string({ required_error: 'Prefix is required' })
      .trim()
      .optional(),
    code: z.number({ required_error: 'Code is required' }).optional(),
    credits: z.number({ required_error: 'Credit is required' }).optional(),
    isDeleted: z.boolean().default(false).optional(),
    preRequisiteCourses: z
      .array(updatePreRequisiteCoursesValidationSchema)
      .optional()
      .default([]),
  }),
});

const facultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z
      .array(z.string({ required_error: 'Faculties is required' }))
      .nonempty('At least one faculty must be assigned'),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesWithCourseValidationSchema,
};
