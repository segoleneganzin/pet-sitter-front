export interface I_User {
  email: string;
  password: string;
  role: 'sitter' | 'owner';
}

export interface I_UserDocument extends I_User {
  id: string;
  profileId: string;
}

export interface I_UserCreate extends I_User {
  profilePicture: FileList;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  tel?: string; // sitter profile
  acceptedPets?: string | string[]; // sitter profile
  presentation?: string; // sitter profile
  pets?: string | string[]; // owner profile
}

export interface I_UserUpdate {
  email?: string;
  password?: string;
}
