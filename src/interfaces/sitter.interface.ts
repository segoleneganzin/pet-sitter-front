import { I_Profile, I_ProfileDocument } from './profile.interface';

export interface I_Sitter extends I_Profile {
  tel: string;
  presentation: string;
  acceptedPets: ('cat' | 'dog' | 'nac')[];
}

export interface I_UserDocument extends I_ProfileDocument, I_Sitter {}
