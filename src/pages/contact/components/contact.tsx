// unda gavaketot useState-is gareshe
import { useState } from 'react';
import styles from './contact.module.css';
import { useParams } from 'react-router-dom';

const Contact: React.FC = () => {
  const [contactinputs, setContactInputs] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { lang } = useParams();
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === 'message' && value.length > 800) {
      setErrorMessage('Message should not be longer than 800 letters');
    } else setErrorMessage('');
    setContactInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(contactinputs);
    setContactInputs({
      name: '',
      surname: '',
      email: '',
      message: '',
    });
  };
  return (
    <div className={styles['contact-container']}>
      <form id="nameform" onSubmit={handleOnSubmit}>
        <label>
          {lang === 'eng' ? 'Enter your name:' : 'სახელი'}
          <input
            type="text"
            name="name"
            value={contactinputs.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          {lang === 'eng' ? 'Enter your surname:' : 'გვარი'}
          <input
            type="text"
            name="surname"
            value={contactinputs.surname}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          {lang === 'eng' ? 'Enter your email:' : 'მეილი'}
          <input
            type="email"
            name="email"
            value={contactinputs.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          {lang === 'eng' ? 'Message' : 'მესიჯი'}
          <textarea
            name="message"
            value={contactinputs.message}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleOnSubmit(
                  event as unknown as React.FormEvent<HTMLFormElement>
                );
              }
            }}
          ></textarea>
        </label>
        <p style={{ color: 'red' }}>{errorMessage}</p>
        <br />
        <button className={styles['submit-btn']} type="submit" value="Submit">
          {lang === 'eng' ? 'Send' : 'გაგზავნა'}
        </button>
      </form>
    </div>
  );
};

export default Contact;
