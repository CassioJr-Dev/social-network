import { $Enums, User } from "@prisma/client";

export class UserEntity implements User {
  name: string;
  userId: string;
  email: string;
  password: string;
  birthDate: Date | null;
  profilePicture: string | null;
  privacy: $Enums.Privacy;
  status: $Enums.UserStatus;
  createdAt: Date;
}
