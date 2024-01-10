export type CampField = {
  id: string;
  created_at: Date;
  name: string;
  content: string;
  company_id: {
    id: string;
    created_at: Date;
    email: string;
    name: string;
  };
  lat: string;
  long: string;
  address: string;
  region: string;
  phone: string;
  check_in: string;
  check_out: string;
  layout: string;
};

export type CampArea = {
  id: string;
  max_people: number;
  price: number;
  photo_url: string;
  name: string;
  camp_id: CampField;
};

export type CampHashtag = {
  id: string;
  tag: string;
  camp_id: CampField;
};

export type CampFacility = {
  id: string;
  option: string;
  camp_id: CampField;
};

export type CampPic = {
  id: string;
  photo_url: string;
  camp_id: CampField;
};
