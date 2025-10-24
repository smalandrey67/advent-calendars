import { type ChangeEvent, memo, useState } from "react";

import { PRODUCTS_MOCK } from "../../shared/constants";

import "./form.css";

export const Form = memo(({ onOpenModal }: { onOpenModal: () => void }) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState({
    phone: "",
    name: "",
    address: "",
    products: "",
  });

  const [products, setProducts] = useState(PRODUCTS_MOCK);

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

    // if (sessionStorage.getItem("formSubmitted")) {
    //   return;
    // }

    const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const productList = products.map((product) => `${product.name} — ${product.quantity} шт. (по ${product.price} грн)`).join("\n");

    if (total === 0) {
      setError({ ...error, products: "!! Ви не обрали жодного товару" });
      return;
    }

    const phoneRegex = /^\+380\d{9}$/;

    if (!phone) {
      setError({ ...error, phone: "Введіть номер телефону" });
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError({ ...error, phone: "Некоректний номер телефону" });
      return;
    }

    const message = `
<b>Заказ!</b>\n
📞 <b>Телефон:</b> ${phone}\n
📦 <b>Имя и фамилия:</b> ${name || "не указали"}\n
💰 <b>Адрес:</b> ${address || "не указали"}
📦 <b>Товары:</b>\n${productList}\n
💰 <b>Сумма:</b> ${total} грн
🙍🏻‍♂️ <b>Агент: ${window.navigator.userAgent}</b>
📅 <b>Дата: ${new Date().toISOString()}</b>
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

      sessionStorage.setItem("formSubmitted", "1");
      onOpenModal();

      setError({ phone: "", name: "", address: "", products: "" });
      setPhone("");
      setName("");
      setAddress("");
      setProducts(PRODUCTS_MOCK);
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

  const increaseQuantity = (productId: string) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: product.quantity + 1,
          active: true,
        };
      }
      return product;
    });

    setError({ ...error, products: "" });
    setProducts(updatedProducts);
  };

  const decreaseQuantity = (productId: string) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId && product.quantity > 0) {
        const updatedQuantity = product.quantity - 1;

        return {
          ...product,
          quantity: updatedQuantity,
          active: updatedQuantity === 0 ? false : product.active,
        };
      }
      return product;
    });

    setProducts(updatedProducts);
  };

  const calculateSubtotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const sum = calculateSubtotal();

  return (
    <div className="form-container">
      <div className="form-products">
        {products.map((product) => (
          <div key={product.id} className={`form-product ${product.active ? "active" : ""}`}>
            <div className="form-product-image">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="form-product-info">
              <h3 className="form-product-title">{product.name}</h3>
              <div className="form-product-price">
                <div className="form-product-price-new">{product.price} грн</div>
                <div className="form-product-price-old">{product.oldPrice} грн</div>
              </div>

              <div className="form-product-buttons">
                <button className="form-product-button" onClick={() => decreaseQuantity(product.id)}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="12px"
                    width="12px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
                  </svg>
                </button>
                <span className="forn-product-quantity">{product.quantity}</span>
                <button className="form-product-button" onClick={() => increaseQuantity(product.id)}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="12px"
                    width="12px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {error.products && <span className="form-products-error">{error.products}</span>}
      </div>

      <form className="order-form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Номер телефона *</label>
          <input type="tel" id="phone" placeholder="+380 (__) ___-__-__" onChange={handleChange} onFocus={handleFocus} value={phone} />
          <span>{error.phone}</span>
        </div>

        <div className="form-group">
          <label htmlFor="name">Ім'я та прізвище</label>
          <input type="tel" id="name" placeholder="Іван Прокопенко" onChange={(e) => setName(e.target.value)} value={name} />
          <span>{error.name}</span>
        </div>

        <div className="form-group">
          <label htmlFor="address">Відділення нової пошти</label>
          <input type="tel" id="address" placeholder="Київ, відділення №123" onChange={(e) => setAddress(e.target.value)} value={address} />
          <span>{error.address}</span>
        </div>

        {!!sum && (
          <div className="form-total">
            <div className="form-total-text">Сума:</div>
            <div className="form-price">{sum} грн</div>
          </div>
        )}

        <button type="submit" className="submit-button">
          🛒 Замовити
        </button>
      </form>
    </div>
  );
});
