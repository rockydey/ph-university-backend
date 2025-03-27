/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  id: string;
  password: string;
  needsPasswordChange?: boolean;
  role: 'student' | 'faculty' | 'admin';
  status?: 'active' | 'blocked';
  isDeleted?: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExists(id: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
