import { supabase } from '@/app/api/db';
import { QueryFunctionContext } from '@tanstack/react-query';

export const getUserReservation = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [, , userId] = queryKey;
  const { data: reservations, error } = await supabase
    .from('reservation')
    .select(
      `id,created_at,check_in_date,check_out_date,fee,people,client_name,client_phone,payment_method,camp_area!inner(name,photo_url,camp!inner(id,name,address,check_in,check_out))`,
    )
    .eq('user_id', userId as string)
    .order('created_at', { ascending: true });

  return reservations;
};
