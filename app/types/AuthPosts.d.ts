import { Post, User } from "./Posts"

export interface authPosts extends User {
  posts: Post[]
}