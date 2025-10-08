import { useRef, useState } from "react";
import { useTimer } from "./hooks/useTimer";

import { Form } from "./components/form/form";

import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form1Ref = useRef<HTMLDivElement>(null);
  const form2Ref = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const timer = useTimer();

  const scrollToForm1 = () => {
    form1Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm2 = () => {
    form2Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handlePlay = () => {
    setIsPlaying(true);

    setTimeout(() => {
      if (!videoRef.current) return;

      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
      videoRef.current.play();
    }, 150);
  };

  const handlePause = () => {
    setIsPlaying(false);

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    if (videoRef.current) {
      videoRef.current.pause();
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
              <img src="/start-screen-image.jpg" alt="Harry Potter Advent Calendar" />
            </div>

            <div className="price-section">
              <div className="prices">
                <span className="current-price">1699 грн</span>
                <span className="old-price">2599 грн</span>
              </div>
              <div className="discount-badge">Скидка 34% • Економія 900 грн</div>
            </div>

            <div className="timer-section">
              <button className="cta-button" onClick={scrollToForm1}>
                🛒 Зробити замовлення
              </button>
              <h3>⏰ До кінця акції залишилось:</h3>
              <div className="countdown">
                <div className="time-unit">
                  <span id="days">{timer.days}</span>
                  <small>днів</small>
                </div>
                <div className="time-unit">
                  <span id="hours">{timer.hours}</span>
                  <small>годин</small>
                </div>
                <div className="time-unit">
                  <span id="minutes">{timer.minutes}</span>
                  <small>хвилин</small>
                </div>
                <div className="time-unit">
                  <span id="seconds">{timer.seconds}</span>
                  <small>секунд</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-description">
        <div className="container">
          <h2>Чарівність кожного дня</h2>
          <p className="section-subtitle">Aдвент-календарі перетворять очікування Нового року на справжню пригоду!</p>

          <div className="video-container">
            {!isPlaying && (
              <div className="video-placeholder" onClick={handlePlay}>
                <div className="play-button">
                  <svg stroke="currentColor" fill="currentColor" viewBox="0 0 448 512" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M424.4 214.7L72.4 6.6C43.8-10.3 0 
                6.1 0 47.9V464c0 37.5 40.7 60.1 
                72.4 41.3l352-208c31.4-18.5 
                31.5-64.1 0-82.6z"
                    ></path>
                  </svg>
                </div>
                <small>Натисніть для перегляду</small>
              </div>
            )}

            <video ref={videoRef} src="/video.mp4" playsInline controls onPause={handlePause} className={isPlaying ? "fullscreen" : ""} />
          </div>

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
        </div>
      </section>

      <section className="order-form" id="order-form">
        <div className="container">
          <h2 ref={form1Ref}>Оформити замовлення</h2>
          <Form onOpenModal={openModal} />
        </div>
      </section>

      <section className="about-company">
        <div className="container">
          <h2>Про нашу компанію</h2>
          <p className="section-subtitle">Ми спеціалізуємося на створенні чарівних моментів для дітей і дорослих.</p>

          <div className="company-content">
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
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Партнерів по всьому світі</span>
                </div>
                <div className="stat">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Позитивних відгуків</span>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-methods">
            <div className="delivery-info">
              <div className="payment-card">
                <h3 className="payment-title">💳 Способи оплати</h3>
                <ul className="payment-list">
                  <li>
                    <strong>Накладений платіж:</strong> оплата під час отримання товару
                  </li>
                  <li>
                    <strong>Повна оплата:</strong> проводиться під час доставки
                  </li>
                  <li>
                    <strong>100% гарантія</strong> повернення коштів протягом 30 днів
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="price-block">
            <div className="price-content">
              <div className="price-title">Акційна ціна</div>
              <div className="price-values">
                <span className="current-price">1699 грн</span>
                <span className="old-price">2599 грн</span>
              </div>
              <div className="discount-info">Знижка 34% • Економія 900 грн</div>
              <button className="order-now-btn" onClick={scrollToForm2}>
                🛒 Замовити зараз
              </button>
            </div>
          </div>
        </div>
      </section>

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

      <section className="order-form" id="order-form-2">
        <div className="container">
          <h2 ref={form2Ref}>Оформити замовлення</h2>
          <Form onOpenModal={openModal} />
        </div>
      </section>

      <section className="contacts">
        <div className="container">
          <h2>📞 Контакти</h2>
          <p className="section-subtitle">Зв’яжіться з нами у будь-який зручний для вас спосіб - ми завжди раді допомогти!</p>

          <div className="contacts-content">
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
                  <a href="mailto:info@adventcalendars.ru" className="contact-value">
                    advcalendars@support.com
                  </a>
                  <p>Для питань та пропозицій</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contacts-footer">Графік роботи: Понеділок - Неділя, 9:00 - 22:00 ФОП Прокопчук Павел Васильович</div>
        </div>
      </section>

      {isModalOpen && (
        <div id="successModal" className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={closeModal} aria-label="close modal">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="15px"
                width="15px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" stroke-linecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368 144 144m224 0L144 368"></path>
              </svg>
            </button>
            <div className="modal-icon">🎉</div>
            <h3 className="modal-title">Замовлення прийнято!</h3>
            <p className="modal-text">Наш менеджер зв'яжеться з вами протягом 15 хвилин</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
