import { TBloodGroup, TGender } from './admin.interface';

export const Gender: TGender[] = ['male', 'female', 'other'];

export const BloodGroup: TBloodGroup[] = [
  'A+',
  'A-',
  'AB+',
  'AB-',
  'B+',
  'B-',
  'O+',
  'O-',
];

export const AdminSearchableFields = [
  'email',
  'name.firstName',
  'name.lastName',
  'name.middleName',
  'contactNo',
  'emergencyContactNo',
  'presentAddress',
  'permanentAddress',
  'designation',
];
