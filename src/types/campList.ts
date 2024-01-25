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
  camp_facility: { facility: { option: string } }[];
};
