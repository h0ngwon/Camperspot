import { Json } from './supabase';

export type CampLists = {
  campList: TCamp[];
};

export type TCamp = {
  id: string;
  name: string;
  created_at: string;
  address: string;
  camp_area: { price: number; id: string }[];
  camp_pic: { id: string; photo_url: string }[];
  hashtag: { tag: string | null }[];
  camp_facility?: { facility: { option: string } }[];
};

export type ParamsCamp = {
  id: string;
  name: string;
  created_at: string;
  address: string;
  region: string;
  camp_area_min_price: number;
  camp_area_max_price: number;
  camp_pic: Json;
  hashtag: Json;
  reservation_count: number;
  total_count: number;
}[];

export type SearchCamp = {
  id: string;
  name: string;
  created_at: string;
  address: string;
  region: string;
  camp_area_min_price: number;
  camp_area_max_price: number;
  camp_pic: Json;
  hashtag: Json;
  facility_option: Json;
  reservation_count: number;
  total_count: number;
}[];
