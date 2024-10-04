type Roles = 'sitter' | 'owner';
type Pets = 'cat' | 'dog' | 'nac';
export interface I_User {
  email: string;
  password: string;
  roles: string;
  profilePicture?: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  tel?: string;
  presentation?: string;
  acceptedPets?: string;
  pets?: string;
}
export interface I_UserDocument {
  id: string;
  email: string;
  roles: Roles[];
  profilePicture?: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  roleDetails: {
    sitter?: {
      tel?: string;
      presentation?: string;
      acceptedPets?: Pets[];
    };
    owner?: {
      pets?: Pets[];
    };
  };
}

export interface I_UserUpdate {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  roles?: string;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  tel?: string;
  presentation?: string;
  acceptedPets?: string;
  pets?: string;
}
