export type LikeCampType = {
  id: string;
  name: string;
  address: string;
  camp_area: {
    price: number;
  }[];
  camp_pic: {
    id: string;
    photo_url: string;
  }[];
}[];
