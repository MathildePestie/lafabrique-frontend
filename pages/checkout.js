import styles from "../styles/Checkout.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { reset, deleteItem } from "../reducers/cart";
import Header from "../components/Header";
import ModalSuccess from "../components/ModalSuccess";

function Checkout() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePayment = () => {
    if (!cardNumber || !expiry || !cvv) {
      alert("Merci de remplir tous les champs !");
      return;
    }

    fetch("http://localhost:3000/orders/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        type: cart.type.flat(),
        couleur: cart.couleur.flat(),
        quantité: cart.quantité,
        prixTotal: cart.prixTotal,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setPaymentSuccess(true);
          setTimeout(() => {
            dispatch(reset());
          }, 500);
        }
      });
  };

  function capitalize(str) {
    return str
      ? str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase()
      : "";
  }

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        {paymentSuccess && <ModalSuccess onClose={() => router.push("/")} />}
        <div className={styles.container}>
          <div className={styles.left}>
            <h2 className={styles.title}>Paiement sécurisé</h2>
            <input
              className={styles.input}
              type="text"
              placeholder="Numéro de carte"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(
                  e.target.value
                    .replace(/\s?/g, "")
                    .replace(/(\d{4})/g, "$1 ")
                    .trim()
                )
              }
            />
            <input
              className={styles.input}
              type="text"
              placeholder="MM/AA"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            <button className={styles.button} onClick={handlePayment}>
              Valider le paiement
            </button>
          </div>

          <div className={styles.right}>
            <div className={styles.clearCartWrapper}>
              <span
                className={styles.clearCart}
                onClick={() => {
                  dispatch(
                    deleteItem({
                      type: [],
                      couleur: [],
                      quantité: 0,
                      prixTotal: 0,
                    })
                  );
                  toast.success("Panier vidé !");
                  setTimeout(() => {
                    router.push("/");
                  }, 1000);
                }}
                title="Vider le panier"
              >
                ✖
              </span>
            </div>
            <h2 className={styles.title}>Récapitulatif</h2>
            <div className={styles.line}>
              <p className={styles.infos}>Quantité : {cart.quantité}</p>
              <p className={styles.infos}>Total : {cart.prixTotal} €</p>
              <div className={styles.colors}>
                {cart.couleur.flat().map((color, index) => (
                  <div
                    key={index}
                    className={styles.color}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
            <div>
              <h2 className={styles.title}>Informations de livraison</h2>
              <p className={styles.infos2}>{capitalize(user.nom)}</p>
              <p className={styles.infos2}>{capitalize(user.prénom)}</p>
              <p className={styles.infos2}>{user.rue}</p>
              <p className={styles.infos2}>{user.codePostal}</p>
              <p className={styles.infos2}>{user.ville}</p>
              <p className={styles.infos2}>{user.mail}</p>
              <p className={styles.infos2}>{user.téléphone}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
