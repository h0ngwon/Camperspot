import { supabase } from '@/app/api/db';

export const getUserReservation = async (userId: string) => {
  const { data: reservations, error } = await supabase
    .from('reservation')
    .select(
      `id,created_at,check_in_date,check_out_date,camp_area!inner(name,camp!inner(name,address))`,
    )
    .eq('user_id', userId);
  return reservations;
};
