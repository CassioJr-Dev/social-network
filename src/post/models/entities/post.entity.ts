import { $Enums, Post } from '@prisma/client'

export class PostEntity implements Post {
  postId: string
  title: string
  content: string
  authorId: string
  privacy: $Enums.Privacy
  createdAt: Date
}
