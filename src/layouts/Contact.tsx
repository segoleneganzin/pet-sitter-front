import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Form } from 'sg-form-lib';
import { Modal } from 'sg-modal-lib';
import { getUserById } from '../services/userApi';
import { formFieldsContact } from '../utils/formFieldsConfig/formFieldsContact';
import { I_SitterDocument } from '../models/sitter';

interface I_ContactProps {
  toggleModal: () => void;
  contactModalOpen: boolean;
  sitter: I_SitterDocument;
}

interface I_FormValues {
  userEmail: string;
  senderFirstname: string;
  senderLastname: string;
  senderEmail: string;
  message: string;
  sitterEmail?: string;
}

const Contact: React.FC<I_ContactProps> = ({
  toggleModal,
  contactModalOpen,
  sitter,
}) => {
  const [isSend, setIsSend] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [btnText, setBtnText] = useState('Annuler');
  const [formValues, setFormValues] = useState<I_FormValues>({
    userEmail: '',
    senderFirstname: '',
    senderLastname: '',
    senderEmail: '',
    message: '',
  });

  useEffect(() => {
    if (sitter) {
      const fetchSitterEmail = async () => {
        const response = await getUserById(sitter.userId);
        console.log(response);
        if (response.body) {
          setFormValues((prevValues) => ({
            ...prevValues,
            sitterEmail: response.body.email,
          }));
        }
      };
      fetchSitterEmail();
    }
  }, [sitter]);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_MAIL_JS_SERVICE_ID,
        import.meta.env.VITE_MAIL_JS_TEMPLATE_ID,
        '#contactForm',
        import.meta.env.VITE_MAIL_JS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsSend(true);
          setBtnText('Fermer');
        },
        (error) => {
          console.log(error);
          setErrorMessage("Erreur lors de l'envoi");
        }
      );
  };
  return (
    <Modal
      isOpen={contactModalOpen}
      toggleModal={toggleModal}
      infos={{ btnText: btnText }}
    >
      {isSend ? (
        <div className='contact__validation'>
          <p>Votre demande de contact a bien été envoyée</p>
        </div>
      ) : (
        <>
          <Form
            formId={'contactForm'}
            fieldsConfig={formFieldsContact}
            title={'Contact'}
            btnText={'Envoyer'}
            onSubmitFunction={sendEmail}
            errorMessage={errorMessage}
            fieldNames={[
              'userEmail',
              'senderFirstname',
              'senderLastname',
              'senderEmail',
              'message',
            ]}
            fieldValue={formValues}
          />
        </>
      )}
    </Modal>
  );
};

export default Contact;
