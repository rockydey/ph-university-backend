import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder<TAdmin>(
    Admin.find().populate('user'),
    query,
  )
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.queryModel;
  return result;
};

export const AdminService = {
  getAllAdminsFromDB,
};
