export const formFieldsContact = {
  userEmail: {
    label: '',
    type: 'email',
    hidden: true,
  },
  senderFirstname: {
    label: 'Prénom',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner votre prénom',
  },
  senderLastname: {
    label: 'Nom',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner votre nom',
  },
  senderEmail: {
    label: 'Email',
    type: 'email',
    pattern: /\S+@\S+\.\S+/,
    fieldErrorMessage: 'Veuillez renseigner votre email',
  },
  message: {
    tag: 'textarea',
    label: 'Message',
    type: 'text',
    fieldErrorMessage: 'Veuillez renseigner votre message',
  },
};
