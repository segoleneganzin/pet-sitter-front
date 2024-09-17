export interface I_Sitter {
  id: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  tel: string;
  city: string;
  country: string;
  presentation: string;
  acceptedPets: ('cat' | 'dog' | 'nac')[];
}

export interface I_SitterDocument extends I_Sitter {
  id: string;
}
