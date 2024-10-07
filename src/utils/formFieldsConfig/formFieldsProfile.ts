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
  roles: {
    type: 'checkbox',
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
  country: {
    type: 'select',
    label: 'Pays',
    defaultValue: 'Choisir votre pays',
    fieldErrorMessage: 'Veuillez renseigner votre pays',
    options: [
      {
        label: 'Angleterre',
        value: 'england',
      },
      {
        label: 'Espagne',
        value: 'spain',
      },
      {
        label: 'France',
        value: 'france',
      },
    ],
  },
  city: {
    label: 'Ville',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner votre ville',
  },
  tel: {
    label: 'Téléphone',
    type: 'text',
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
        name: 'acceptDog',
      },
      {
        label: 'Chat',
        value: 'cat',
        name: 'acceptCat',
      },
      {
        label: 'NAC',
        value: 'nac',
        name: 'acceptNac',
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
        name: 'ownDog',
      },
      {
        label: 'Chat',
        value: 'cat',
        name: 'ownCat',
      },
      {
        label: 'NAC',
        value: 'nac',
        name: 'ownNac',
      },
    ],
  },
};
