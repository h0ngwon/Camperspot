import { supabase } from '@/app/api/db';

export const deleteUserReservation = async (id: string) => {
  const { error } = await supabase.from('reservation').delete().eq('id', id);
  return error;
};
