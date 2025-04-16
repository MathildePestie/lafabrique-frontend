import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Cart.module.css";
import { update, deleteItem } from "../reducers/cart";
import Header from "../components/Header";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Ton panier</h1>

        {cart.quantité === 0 ? (
          <p className={styles.empty}>
            Ton panier est vide... pour le moment !
          </p>
        ) : (
          <>
          <div  className={styles.clearCartWrapper}>
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
            <div className={styles.items}>
              {cart.couleur.flat().map((color, index) => (
                <div
                  key={index}
                  className={styles.item}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>

            <div className={styles.infos}>
              <p className={styles.infos}>
                Produit :
                {[...new Set(cart.type)]
                  .map((t) => ` ${t.charAt(0).toUpperCase()}${t.slice(1)}`)
                  .join(",")}
              </p>
              <p>Quantité totale : {cart.quantité}</p>
              <p>Prix total : {cart.prixTotal} €</p>
            </div>

            <button className={styles.validateButton} onClick={handleCheckout}>
              Valider ma commande
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
