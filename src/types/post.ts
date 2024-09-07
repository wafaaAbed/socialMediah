export type TPost = {
  id: number;
  title: string;
  body: string;
  image: string;
  tags?: string[];
  created_at?: string;
  comments_count: number;
  author?: {
    id?: number;
    profile_image?: string;
    is_fake?: number;
    username?: string;
    name?: string;
    email?: string;
    email_verified_at?: string;
    remember_token?: string;
    created_at?: string;
    updated_at?: string;
  },
  comments?:[ {
    id:number,
    body:string,
    author?: {
      id?: number;
      profile_image?: string;
      is_fake?: number;
      username?: string;
      name?: string;
      email?: string;
      email_verified_at?: string;
      remember_token?: string;
      created_at?: string;
      updated_at?: string;
    }
  }],
};
