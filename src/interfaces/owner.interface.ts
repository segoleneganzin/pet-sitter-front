import { I_Profile, I_ProfileDocument } from './profile.interface';

export interface I_Owner extends I_Profile {
  pets: string[];
}

export interface I_UserDocument extends I_ProfileDocument, I_Owner {}
