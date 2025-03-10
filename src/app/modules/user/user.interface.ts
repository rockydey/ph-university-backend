export interface IUser {
  id: string;
  password: string;
  needsPasswordChange?: boolean;
  role: 'student' | 'faculty' | 'admin';
  status?: 'active' | 'blocked';
  isDeleted?: boolean;
}
