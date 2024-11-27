export type Comment = {
  url: string;
  id: number;
  postId: number;
  created: Date;
  updated: Date;
  name: string;
  email: string;
  body: string;
  active: boolean;
};
