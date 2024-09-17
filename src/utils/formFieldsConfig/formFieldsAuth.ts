export const formFieldsAuth = {
  email: {
    label: 'Email',
    type: 'email',
    pattern: /\S+@\S+\.\S+/,
    fieldErrorMessage: 'Veuillez renseigner votre email',
  },
  newEmail: {
    label: 'Nouvel e-mail :',
    type: 'email',
    pattern: /\S+@\S+\.\S+/,
    fieldErrorMessage: 'Veuillez renseigner votre nouvel email',
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
  rememberMe: {
    tag: 'checkbox',
    type: 'checkbox',
    isRequired: false,
    options: [
      {
        label: ' Se souvenir de moi',
        value: 'remember-me',
        name: 'rememberMe',
      },
    ],
  },
};
