export const formFieldsProfile = {
  email: {
    label: 'Email',
    type: 'email',
    pattern: /\S+@\S+\.\S+/,
    fieldErrorMessage: 'Veuillez renseigner votre email',
  },
  password: {
    label: 'Mot de passe',
    type: 'password',
    // pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    fieldErrorMessage: 'Veuillez renseigner votre mot de passe',
  },
  passwordConfirmation: {
    label: 'Confirmer le mot de passe :',
    type: 'password',
    // pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    fieldErrorMessage: 'Veuillez confirmer votre mot de passe',
  },
  role: {
    type: 'radio',
    label: 'Rôle',
    fieldErrorMessage: 'Veuillez renseigner votre rôle',
    options: [
      {
        label: 'Gardien',
        value: 'sitter',
        name: 'sitter',
      },
      {
        label: 'Propriétaire',
        value: 'owner',
        name: 'owner',
      },
    ],
  },
  profilePicture: {
    label: 'Photo de profil',
    type: 'file',
    isRequired: false,
  },
  firstName: {
    label: 'Prénom',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner votre prénom',
  },
  lastName: {
    label: 'Nom',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner votre nom',
  },
  city: {
    label: 'Ville',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner votre ville',
  },
  country: {
    label: 'Pays',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner votre pays',
  },
  tel: {
    label: 'Téléphone',
    type: 'text',
    isRequired: false,
  },
  presentation: {
    tag: 'textarea',
    label: 'Présentation',
    type: 'number',
    fieldErrorMessage: 'Veuillez renseigner votre présentation',
  },
  acceptedPets: {
    tag: 'checkbox',
    type: 'checkbox',
    label: 'Animaux acceptés',
    fieldErrorMessage:
      'Veuillez renseigner les animaux que vous accepter en garde',
    options: [
      {
        label: 'Chien',
        value: 'dog',
        name: 'dog',
      },
      {
        label: 'Chat',
        value: 'cat',
        name: 'cat',
      },
      {
        label: 'NAC',
        value: 'nac',
        name: 'nac',
      },
    ],
  },
  pets: {
    tag: 'checkbox',
    type: 'checkbox',
    label: 'Animaux possédés',
    fieldErrorMessage: 'Veuillez renseigner les animaux que vous posséder',
    options: [
      {
        label: 'Chien',
        value: 'dog',
        name: 'dog',
      },
      {
        label: 'Chat',
        value: 'cat',
        name: 'cat',
      },
      {
        label: 'NAC',
        value: 'nac',
        name: 'nac',
      },
    ],
  },
};
