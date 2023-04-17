export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: null | boolean;
  image: string;
}

export interface Comment {
  id: string;
  createdAt: Date;
  message: string;
  userId: string;
  postId: string;
}

export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  published: boolean;
  userId: string;
  user: User;
  comments: Comment[]
}
