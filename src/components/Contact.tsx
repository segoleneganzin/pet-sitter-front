import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../utils/reduxHooks';
import emailjs from '@emailjs/browser';
import { Form } from 'sg-form-lib';
import { Modal } from 'sg-modal-lib';
import { getUserEmail } from '../services/userApi';
import { formFieldsContact } from '../utils/formFieldsConfig/formFieldsContact';
import { selectSitter } from '../features/sitterSlice';

interface ContactProps {
  toggleModal: () => void;
  contactModalOpen: boolean;
}

interface FormValues {
  userEmail: string;
  senderFirstname: string;
  senderLastname: string;
  senderEmail: string;
  message: string;
  sitterEmail?: string;
}

const Contact: React.FC<ContactProps> = ({ toggleModal, contactModalOpen }) => {
  const sitter = useAppSelector((state) => selectSitter(state));
  const [isSend, setIsSend] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [btnText, setBtnText] = useState('Annuler');
  const [formValues, setFormValues] = useState<FormValues>({
    userEmail: '',
    senderFirstname: '',
    senderLastname: '',
    senderEmail: '',
    message: '',
  });

  useEffect(() => {
    if (sitter) {
      getUserEmail(sitter.id)
        .then((response) => {
          if (
            response.body &&
            typeof response.body === 'object' &&
            'email' in response.body
          ) {
            setFormValues((prevValues) => ({
              ...prevValues,
              sitterEmail: (response.body as { email?: string }).email ?? '',
            }));
          }
        })
        .catch((error) => setErrorMessage(error.message));
    }
  }, [sitter]);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // not empty the form if errors occured in backend
    // Object.keys(datas).forEach((key) => {
    //   if (key !== 'userEmail') {
    //     setFormValues((prevValues) => ({
    //       ...prevValues,
    //       [key]: datas[key],
    //     }));
    //   }
    // });
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
        <div className='modal__validation'>
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
