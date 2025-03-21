import QueryBuilder from '../../builder/QueryBuilder';
import { FacultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder<TFaculty>(
    Faculty.find()
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      })
      .populate('user'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.queryModel;
  return result;
};

export const FacultyService = {
  getAllFacultiesFromDB,
};
