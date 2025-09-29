import { useRef, useState, type ChangeEvent } from "react";

import "./App.css";
import { Form } from "./components/form/form";

function App() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const formRef = useRef<HTMLDivElement>(null);
  const form2Ref = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  const handleFocus = () => {
    if (phone === "+380") {
      setPhone("");
    }

    if (!phone) {
      setPhone("+380");
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
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-header">
              <h1 className="hero-title">АДВЕНТ КАЛЕНДАР 2025</h1>
            </div>

            <div className="hero-image">
              <img src="/start-screen-image.webp" alt="Harry Potter Advent Calendar" />
            </div>

            {/* <!-- Цена --> */}
            <div className="price-section">
              <div className="prices">
                <span className="current-price">1499 грн</span>
                <span className="old-price">2399 грн</span>
              </div>
              <div className="discount-badge">Скидка 32% • Економія 900 грн</div>
            </div>

            {/* <!-- Таймер --> */}
            <div className="timer-section">
              <button className="cta-button">🛒 Зробити замовлення</button>
              <h3>⏰ До кінця акції залишилось:</h3>
              <div className="countdown">
                <div className="time-unit">
                  <span id="days">7</span>
                  <small>днів</small>
                </div>
                <div className="time-unit">
                  <span id="hours">23</span>
                  <small>годин</small>
                </div>
                <div className="time-unit">
                  <span id="minutes">59</span>
                  <small>хвилин</small>
                </div>
                <div className="time-unit">
                  <span id="seconds">45</span>
                  <small>секунд</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Описание товара --> */}
      <section className="product-description">
        <div className="container">
          <h2>Чарівність кожного дня</h2>
          <p className="section-subtitle">Aдвент-календарі перетворять очікування Нового року на справжню пригоду!</p>

          {/* <!-- Видео --> */}
          <div className="video-container">
            <div className="video-placeholder">
              <div className="play-button">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 448 512"
                  height="13px"
                  width="13px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                </svg>
              </div>
              <p>Відео</p>
              <small>Натисніть для перегляду</small>
            </div>
          </div>

          {/* <!-- Особенности --> */}
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎁</div>
              <h3>Преміум якість</h3>
              <p>Матеріали найвищої якості та круті фігурки</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Надійна доставка</h3>
              <p>Акуратне пакування та доставка по всій країні</p>
            </div>
          </div>

          {/* <!-- Характеристики --> */}
          {/* <div className="specifications">
            <h3>📋 Характеристики</h3>
            <div className="specs-table">
              <div className="spec-row">
                <span>Размер:</span>
                <span>40 × 30 см</span>
              </div>
              <div className="spec-row">
                <span>Материал:</span>
                <span>Плотный картон 350 г/м²</span>
              </div>
              <div className="spec-row">
                <span>Печать:</span>
                <span>Полноцветная офсетная</span>
              </div>
              <div className="spec-row">
                <span>Покрытие:</span>
                <span>Матовое ламинирование</span>
              </div>
              <div className="spec-row">
                <span>Содержимое:</span>
                <span>24 кармашка с сюрпризами</span>
              </div>
              <div className="spec-row">
                <span>Возрастная категория:</span>
                <span>6+</span>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* <!-- Форма заказа #1 --> */}
      <section className="order-form" id="order-form">
        <div className="container">
          <h2>Оформити замовлення</h2>
          <Form />
        </div>
      </section>

      {/* <!-- О компании --> */}
      <section className="about-company">
        <div className="container">
          <h2>Про нашу компанію</h2>
          <p className="section-subtitle">Ми спеціалізуємося на створенні чарівних моментів для дітей і дорослих.</p>

          <div className="company-content">
            {/* <!-- Достижения --> */}
            <div className="achievements">
              <h3>Чому обирають нас</h3>
              <div className="stats-grid">
                <div className="stat">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Років на ринку</span>
                </div>
                <div className="stat">
                  <span className="stat-number">10k+</span>
                  <span className="stat-label">Задоволених клієнтів</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Міст доставки</span>
                </div>
                <div className="stat">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Позитивних відгуків</span>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Способы оплаты --> */}
          <div className="payment-methods">
            <div className="delivery-info">
              <div className="payment-card">
                <h3 className="payment-title">💳 Способи оплати</h3>
                <ul className="payment-list">
                  <li>
                    <strong>Накладений платіж:</strong> оплата під час отримання товару
                  </li>
                  <li>
                    <strong>Оплата на ФОП:</strong> прямий платіж на рахунок підприємця
                  </li>
                  <li>
                    <strong>100% гарантія</strong> повернення коштів протягом 30 днів
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="payment-grid">
              <div className="payment-method">
                <div className="payment-icon">💳</div>
                <span>Банковская карта</span>
              </div>
              <div className="payment-method">
                <div className="payment-icon">💵</div>
                <span>Наличными курьеру</span>
              </div>
              <div className="payment-method">
                <div className="payment-icon">🏦</div>
                <span>Банковский перевод</span>
              </div>
            </div> */}
          </div>

          {/* <!-- Блок с ценой --> */}
          <div className="price-block">
            <div className="price-content">
              <div className="price-title">Акційна ціна</div>
              <div className="price-values">
                <span className="current-price">1499 грн</span>
                <span className="old-price">2399 грн</span>
              </div>
              <div className="discount-info">Знижка 32% • Економія 900 грн</div>
              <button className="order-now-btn">🛒 Замовити зараз</button>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Как оформить заказ --> */}
      <section className="how-to-order">
        <div className="container">
          <h2>Як оформити замовлення?</h2>
          <p className="section-subtitle">Простий процес замовлення в 3 кроки. Ніяких складнощів і зайвих дій</p>

          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-icon">📝</div>
              <h3>Залиште заявку</h3>
              <p>Заповніть форму з номером телефону</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-icon">📞</div>
              <h3>Підтвердьте замовлення</h3>
              <p>Наш менеджер зв’яжеться з вами протягом 30 хвилин, щоб підтвердити замовлення та уточнити деталі доставки</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-icon">📦</div>
              <h3>Отримайте календар</h3>
              <p>Доставка по всій Україні. Оплата при отриманні</p>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Форма заказа #2 --> */}
      <section className="order-form" id="order-form-2">
        <div className="container">
          <h2>Оформити замовлення</h2>
          <Form />
        </div>
      </section>

      {/* <!-- Контакты --> */}
      <section className="contacts">
        <div className="container">
          <h2>📞 Контакты</h2>
          <p className="section-subtitle">Зв’яжіться з нами у будь-який зручний для вас спосіб — ми завжди раді допомогти!</p>

          <div className="contacts-content">
            {/* <!-- Контактная информация --> */}
            <div className="contact-info">
              <h3>💬 Як з нами зв'язатися</h3>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <a href="tel:+78001234567" className="contact-value">
                    +380 (67) 123-45-67
                  </a>
                  <p>Безкоштовно по Україні</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:info@adventcalendars.ru" className="contact-value">
                    advcalendars@support.com
                  </a>
                  <p>Для питань та пропозицій</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div>
                  <h4>Графік работи</h4>
                  <span className="contact-value">9:00 - 22:00</span>
                  <p>Щодня, без вихідних</p>
                </div>
              </div>
            </div>

            {/* <!-- Реквизиты --> */}
            {/* <div className="company-details">
              <h3>🏢 Реквизиты компании</h3>
              <div className="detail-item">
                <span className="detail-label">Наименование:</span>
                <span className="detail-value">ИП Иванов Иван Иванович</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ИНН:</span>
                <span className="detail-value">123456789012</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ОГРНИП:</span>
                <span className="detail-value">123456789012345</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Юридический адрес:</span>
                <span className="detail-value">123456, г. Москва, ул. Примерная, д. 123, кв. 45</span>
              </div>

              <div className="additional-info">
                <h4>📝 Дополнительная информация</h4>
                <ul>
                  <li>Регистрация в налоговой: 01.01.2020</li>
                  <li>Основной вид деятельности: розничная торговля</li>
                  <li>Все товары сертифицированы и соответствуют ГОСТ</li>
                </ul>
              </div>

              <div className="call-to-action">
                <h4>🎯 Готовы заказать?</h4>
                <p>Позвоните нам прямо сейчас!</p>
                <a href="tel:+78001234567" className="phone-button">
                  📞 +7 (800) 123-45-67
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
