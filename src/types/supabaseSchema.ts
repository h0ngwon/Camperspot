export interface Facility {
  id: number /* primary key */;
  option?: string;
}

export interface Post {
  id: string /* primary key */;
  created_at: string;
  title: string;
  content: string;
}

export interface User {
  id: string /* primary key */;
  email: string;
  password?: string;
  nickname: string;
  profile_url?: string;
}

export interface Post_pic {
  id: string /* primary key */;
  photo_url?: string;
  post_id: string /* foreign key to post.id */;
  post?: Post;
}

export interface Comment {
  id: string /* primary key */;
  created_at: string;
  content: string;
  post_id: string /* foreign key to post.id */;
  user_id: string /* foreign key to user.id */;
  post?: Post;
  user?: User;
}

export interface Company_user {
  id: string /* primary key */;
  created_at: string;
  email: string;
  password: string;
  name: string;
}

export interface Camp {
  id: string /* primary key */;
  created_at: string;
  name: string;
  content: string;
  address: string;
  region: string;
  company_id: string /* foreign key to company_user.id */;
  phone: string;
  check_in: string;
  check_out: string;
  layout: string;
  company_user?: Company_user;
  camp_facility?: Camp_facility[];
  camp_pic?: Camp_pic[];
  hashtag?: Hashtag[];
}

export interface Like {
  id: string /* primary key */;
  user_id: string /* foreign key to user.id */;
  camp_id?: string /* foreign key to camp.id */;
  post_id?: string /* foreign key to post.id */;
  user?: User;
  camp?: Camp;
  post?: Post;
}

export interface Camp_pic {
  id: string /* primary key */;
  photo_url: string;
  camp_id: string /* foreign key to camp.id */;
  camp?: Camp;
}

export interface Hashtag {
  id: string /* primary key */;
  tag?: string;
  camp_id: string /* foreign key to camp.id */;
  camp?: Camp;
}

export interface Camp_area {
  id: string /* primary key */;
  max_people: number;
  price: number;
  photo_url: string;
  name: string;
  camp_id: string /* foreign key to camp.id */;
  camp?: Camp;
}

export interface Camp_facility {
  id: string /* primary key */;
  camp_id?: string /* foreign key to camp.id */;
  facility_id?: number /* foreign key to facility.id */;
  camp?: Camp;
  facility?: Facility;
}

export interface Reservation {
  id: string /* primary key */;
  created_at: string;
  people: number;
  check_in_date: string;
  check_out_date: string;
  fee: number;
  user_id: string /* foreign key to user.id */;
  camp_area_id: string /* foreign key to camp_area.id */;
  user?: User;
  camp_area?: Camp_area;
}

export interface Review {
  id: string /* primary key */;
  created_at: string;
  content: string;
  rating: number;
  camp_id: string /* foreign key to camp.id */;
  user_id: string /* foreign key to user.id */;
}
