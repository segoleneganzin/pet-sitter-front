export interface I_Owner {
  profilePicture: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  pets: string[];
}

export interface I_OwnerDocument extends I_Owner {
  id: string;
  userId: string;
}
