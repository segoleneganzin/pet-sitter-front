import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Form } from 'sg-form-lib';
import { Modal } from 'sg-modal-lib';
import { formFieldsContact } from '../utils/formFieldsConfig/formFieldsContact';
import { I_UserDocument } from '../interfaces/user.interface';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectUser } from '../features/userSlice';

interface I_ContactProps {
  toggleModal: () => void;
  contactModalOpen: boolean;
  sitter: I_UserDocument;
}

interface I_FormValues {
  sitterEmail: string;
  senderFirstname: string;
  senderLastname: string;
  senderEmail: string;
  message: string;
}

const Contact: React.FC<I_ContactProps> = ({
  toggleModal,
  contactModalOpen,
  sitter,
}) => {
  const user = useAppSelector(selectUser);

  const [isSend, setIsSend] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [btnText, setBtnText] = useState('Annuler');
  const [formValues, setFormValues] = useState<I_FormValues>({
    sitterEmail: '',
    senderFirstname: '',
    senderLastname: '',
    senderEmail: '',
    message: '',
  });

  useEffect(() => {
    if (user) {
      console.log(user);
      setFormValues((prevValues) => ({
        ...prevValues,
        senderEmail: user.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (sitter) {
      console.log(sitter);
      setFormValues((prevValues) => ({
        ...prevValues,
        sitterEmail: sitter.email,
      }));
    }
  }, [sitter]);

  const sendEmail = () => {
    console.log('coucou');
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
          <p className='text'>Votre demande de contact a bien été envoyée</p>
        </div>
      ) : (
        <div className='contact'>
          <Form
            formId={'contactForm'}
            fieldsConfig={formFieldsContact}
            title={'Contact'}
            btnText={'Envoyer'}
            onSubmitFunction={sendEmail}
            errorMessage={errorMessage}
            fieldNames={[
              'sitterEmail',
              'senderFirstname',
              'senderLastname',
              'senderEmail',
              'message',
            ]}
            fieldValue={formValues}
          />
        </div>
      )}
    </Modal>
  );
};

export default Contact;
