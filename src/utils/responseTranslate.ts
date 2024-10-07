enum ErrorKeys {
  AuthorizationHeaderMissing = 'Authorization header is missing',
  PasswordRequired = 'Password is required',
  UserNotFound = 'User not found',
  EmailAlreadyExists = 'Email already exists',
  ProfileCreationFailed = 'Profile creation failed',
  InvalidIdSupplied = 'Invalid ID supplied',
  SitterCreationFailed = 'Sitter creation failed',
  FailedToRetrieveSitters = 'Failed to retrieve Sitters. Please try again later.',
  SitterNotFound = 'Sitter not found',
  OwnerCreationFailed = 'Owner creation failed',
  FailedToRetrieveOwners = 'Failed to retrieve Owners. Please try again later.',
  OwnerNotFound = 'Owner not found',
  InvalidUsernamePasswordSupplied = 'Invalid username/password supplied',
  InvalidPictureFormat = 'Invalid file type. Only JPG, JPEG, and PNG files are allowed.',
  PetDog = 'dog',
  PetCat = 'cat',
  PetNac = 'nac',
}

const errorMessages: Record<ErrorKeys, string> = {
  [ErrorKeys.AuthorizationHeaderMissing]:
    "L'en-tête d'autorisation est manquant",
  [ErrorKeys.PasswordRequired]: 'Le mot de passe est requis',
  [ErrorKeys.UserNotFound]: 'Utilisateur non trouvé',
  [ErrorKeys.EmailAlreadyExists]: "L'email existe déjà",
  [ErrorKeys.ProfileCreationFailed]: 'La création du profil a échoué',
  [ErrorKeys.InvalidIdSupplied]: 'ID fourni invalide',
  [ErrorKeys.SitterCreationFailed]: 'La création du pet-sitter a échoué',
  [ErrorKeys.FailedToRetrieveSitters]:
    'Échec de la récupération des pet-sitters. Veuillez réessayer plus tard.',
  [ErrorKeys.SitterNotFound]: 'Pet-sitter non trouvé',
  [ErrorKeys.OwnerCreationFailed]: 'La création du propriétaire a échoué',
  [ErrorKeys.FailedToRetrieveOwners]:
    'Échec de la récupération des propriétaires. Veuillez réessayer plus tard.',
  [ErrorKeys.OwnerNotFound]: 'Propriétaire non trouvé',
  [ErrorKeys.InvalidUsernamePasswordSupplied]:
    "Nom d'utilisateur/mot de passe invalide",
  [ErrorKeys.InvalidPictureFormat]:
    "Format d'image invalide. Formats acceptés : JPG, JPEG, PNG.",
  [ErrorKeys.PetDog]: 'Chien',
  [ErrorKeys.PetCat]: 'Chat',
  [ErrorKeys.PetNac]: 'NAC',
};

export const translateMessage = (message: string): string => {
  console.log(message);
  // return translation or original message if no translation founded
  return errorMessages[message as ErrorKeys] || message;
};
