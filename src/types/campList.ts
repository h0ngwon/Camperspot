import { Json } from './supabase';

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
  review_average: number;
  review_count: number;
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
  review_average: number;
  review_count: number;
}[];

export type TopReservedCamp = {
  id: string;
  name: string;
  address: string;
  camp_area_min_price: number;
  camp_pic: Json;
  hashtag: Json;
  review_average: number;
  reservation_count: number;
  review_count: number;
};
