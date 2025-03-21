import { TBloodGroup, TGender } from './faculty.interface';

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

export const FacultySearchableFields = [
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
