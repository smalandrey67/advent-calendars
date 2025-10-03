import { type ChangeEvent, useState } from "react";

import "./form.css";

export const Form = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleFocus = () => {
    if (phone === "+380") {
      setPhone("");
    }

    if (!phone) {
      setPhone("+380");
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    return;

    const phoneRegex = /^\+380\d{9}$/;

    if (!phoneRegex.test(phone)) {
      setError("некоректний номер телефону у форматі +380XXXXXXXXX");
      return;
    }

    const message = `
				<b>Нове замовлення!</b>
				<b>Телефон:</b> ${phone}
			`;

    const url = `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
      chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML",
    };

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setError("");
      setPhone("");
    } catch (error) {
      console.error("Ошибка при отправке в Telegram:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.startsWith("+380")) {
      const digits = value.replace(/\D/g, "").slice(3);
      setPhone("+380" + digits);
    } else {
      setPhone("+380");
    }
  };

  return (
    <form className="order-form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="phone">Номер телефона *</label>
        <input type="tel" id="phone" placeholder="+380 (__) ___-__-__" required onChange={handleChange} onFocus={handleFocus} value={phone} />
      </div>

      <button type="submit" className="submit-button">
        🛒 Замовити
      </button>

      {error}
      <p className="form-note">* Натискаючи кнопку «Замовити», ви погоджуєтеся з умовами обробки персональних даних</p>
    </form>
  );
};
