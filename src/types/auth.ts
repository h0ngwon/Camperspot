import { Tables } from './supabase';

export type SigninType = Pick<Tables<'company_user'>, 'email' | 'password'>;
export type SocialDataType = Omit<Tables<'user'>, 'id' | 'password'>