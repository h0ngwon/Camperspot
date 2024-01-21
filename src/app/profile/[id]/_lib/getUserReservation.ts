import { supabase } from '@/app/api/db';

export const getUserReservation = async (userId: string) => {
  const { data: reservations, error } = await supabase
    .from('reservation')
    .select(
      `id,created_at,check_in_date,check_out_date,fee,people,client_name,client_phone,payment_method,camp_area!inner(name,camp!inner(name,address,check_in,check_out))`,
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  return reservations;
};
