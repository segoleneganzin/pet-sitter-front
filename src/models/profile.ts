export interface I_Profile {
  profilePicture: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  tel?: string;
  presentation?: string;
  acceptedPets?: ('cat' | 'dog' | 'nac')[];
  pets?: string[];
}

export interface I_ProfileDocument extends I_Profile {
  id: string;
  userId: string;
}

export interface I_ProfileUpdate {
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  tel?: string;
  presentation?: string;
  acceptedPets?: ('cat' | 'dog' | 'nac')[];
  pets?: string[];
}
