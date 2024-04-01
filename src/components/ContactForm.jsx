import React, { useState } from 'react';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  function submitForm(event) {
    // event.preventDefault();S
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
              className={styles.field}
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
          </div>
          <label htmlFor="email">e-mail</label>
          <div>
            <input
              className={styles.field}
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
          </div>
          <label htmlFor="text">Текст отзыва</label>
          <div>
            <textarea
              className={styles.field}
              id="text"
              type="text"
              placeholder="Ваш отзыв"
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
