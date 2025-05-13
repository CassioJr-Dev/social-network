import { Like } from '@prisma/client'

export class LikeEntity implements Like {
  likeId: string
  userId: string
  postId: string
  createdAt: Date
}
