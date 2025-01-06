import React, { useState } from "react";
import styles from "./login-or-register.module.css";

const ChatRender = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email ingresado: ${email}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>ChatRender</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            Enter with email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRender;
