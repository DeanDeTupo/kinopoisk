import React, { useState } from 'react';
import styles from './ContactForm.module.css';

function validateEmail(email) {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.length) return false;
  return email.match(pattern) ? true : false;
}

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState(false);

  function submitForm(event) {
    event.preventDefault();
    setErrorName(name.length < 2);
    setErrorEmail(!validateEmail(email));
    setErrorFeedback(feedback.length < 10);

    if (name.length < 2 || !validateEmail(email) || feedback.length < 10)
      return;
    alert(`Спасибо за отзыв, ${name}`);
    setName('');
    setEmail('');
    setFeedback('');
  }

  return (
    <div>
      <section>
        <h2>Предложения по улучшению сервиса</h2>
        <p>Пожалуйста, напишите что можно сделать лучше</p>
      </section>
      <div className={styles.wrapper}>
        <form className={styles.form} autoComplete="new-password">
          <label htmlFor="name">Имя</label>
          <div>
            <input
              className={`${styles.field} ${errorName ? styles.error : ''}`}
              id="name"
              type="text"
              placeholder="Ваше имя"
              minLength={2}
              maxLength={30}
              value={name}
              required
              autoComplete="new-password"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <p
              className={`${
                errorName ? styles.errorMessage : styles.errorHide
              }`}
            >
              *минимум 2 символа
            </p>
          </div>
          <label htmlFor="email">e-mail</label>
          <div>
            <input
              className={`${styles.field} ${errorEmail ? styles.error : ''}`}
              autoComplete="new-password"
              id="email"
              type="email"
              placeholder="Введите e-mail"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <p
              className={`${
                errorName ? styles.errorMessage : styles.errorHide
              }`}
            >
              *непрвильный e-mail
            </p>
          </div>
          <label htmlFor="text">Текст отзыва</label>
          <div>
            <textarea
              className={`${styles.field} ${errorFeedback ? styles.error : ''}`}
              id="text"
              type="text"
              placeholder="Ваш отзыв, минимум 10 символов"
              value={feedback}
              required
              autoComplete="off"
              minLength={10}
              rows="8"
              cols="33"
              onChange={(e) => {
                setFeedback(e.target.value);
              }}
            ></textarea>
            <p
              className={`${
                errorFeedback ? styles.errorMessage : styles.errorHide
              }`}
            >
              *минимум 10 символов
            </p>
          </div>

          <button className={styles.formBtn} onClick={(e) => submitForm(e)}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
