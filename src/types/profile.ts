export type LikeCampType = {
  user_id: string;
  camp: {
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
  };
}[];

export type LikePostType = {
  user_id: string;
  post: {
    id: string;
    content: string;
    post_pic: {
      photo_url: string;
    }[];
    post_hashtag: {
      tag: string;
    }[];
  };
}[]
