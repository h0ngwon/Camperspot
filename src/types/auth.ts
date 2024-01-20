import { Tables } from './supabase';

export type SocialDataType = Omit<Tables<'user'>, 'id' | 'password'>;
export type CompanyUserSigninType = Pick<
  Tables<'company_user'>,
  'email' | 'password'
>;
export type CompanyUserSignUpType = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};
export type UserType = Omit<SocialDataType, 'role'> | null;