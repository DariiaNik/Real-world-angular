import { Profile } from 'src/app/shared/models/profile-interface';

export interface ResponseComment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}
