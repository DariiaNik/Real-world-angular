import { Profile } from 'src/app/shared/models/profile-interface';

export interface SingleComment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}
