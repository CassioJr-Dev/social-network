import { $Enums, User } from "@/shared/config/database/generated/prisma";

export class UserEntity implements User {
  user: string;
  userId: string;
  email: string;
  password: string;
  birthDate: Date;
  profilePicture: string;
  privacy: $Enums.Privacy;
  status: $Enums.UserStatus;
  createdAt: Date;
}
