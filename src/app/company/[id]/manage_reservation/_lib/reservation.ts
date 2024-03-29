import { supabase } from '@/app/api/db';

export const getCompanyReservation = async (companyId: string) => {
  const { data: reservations, error } = await supabase
    .from('reservation')
    .select(
      `id,client_name,client_phone,created_at,people,camp_area!inner(id,camp_area_name:name,camp!inner(camp_name:name,company_user!inner(id)))`,
    )
    .eq('camp_area.camp.company_user.id', companyId)
    .order('created_at', { ascending: true });

  return reservations;
};

export const getCampAreaReservation = async (campAreaId: string) => {
  const { data: reservations, error } = await supabase
    .from('reservation')
    .select(`check_in_date,check_out_date,camp_area_id`)
    .eq('camp_area_id', campAreaId);

  return reservations;
};

export const deleteCompanyReservation = async (reservationId: string) => {
  const { error } = await supabase
    .from('reservation')
    .delete()
    .eq('id', reservationId);
  return error;
};
