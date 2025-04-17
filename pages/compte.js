import styles from "../styles/Compte.module.css";
import { CSSTransition } from "react-transition-group";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PasswordModal from "../components/PasswordModal";
import { login } from "../reducers/user";
import { setPalettes } from "../reducers/palette";
import PalettePreview from "../components/PalettePreview";
import PalettesModal from "../components/PalettesModal";

function Compte() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const palettes = useSelector((state) => state.palette.value);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showPalettesModal, setShowPalettesModal] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);

  function capitalize(str) {
    return str
      ? str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase()
      : "";
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    nom: user?.nom || "",
    prénom: user?.prénom || "",
    rue: user?.rue || "",
    codePostal: user?.codePostal || "",
    ville: user?.ville || "",
    mail: user?.mail || "",
    téléphone: user?.téléphone || "",
    password: user?.password || "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const toggleShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        "https://lafabrique-backend.vercel.app/users/update-profile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            ...editedData,
          }),
        }
      );

      const data = await response.json();
      if (data.result) {
        dispatch(login({ ...user, ...editedData }));
        setIsEditing(false);
      } else {
        console.error(
          "Erreur lord de la mise à jour des informations du profil utilisateur"
        );
      }
    } catch (error) {
      console.error("erreur du serveur", error);
    }
  };

  const handleSaveChangesPassword = async () => {
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas !");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://lafabrique-backend.vercel.app/users/update-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (data.result) {
        toast.success("Mot de passe modifié avec succès");
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setShowPasswordModal(false);
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch (error) {
      console.error("Erreur serveur", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("https://lafabrique-backend.vercel.app/users/get-palettes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(setPalettes(data.palettes)); // dispatch Redux si tu veux
        }
      });
  }, []);

  useEffect(() => {
    fetch("https://lafabrique-backend.vercel.app/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Résultat reçu côté frontend :", data.orders);
        if (data.result) {
          setOrders(data.orders);
        }
      });
  }, [user.token]);
  console.log("Nombre de commandes :", orders.length);

  return (
    <div>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.wrapper}>
        <div className={styles.leftContent}>
          <h1 className={styles.title}>
            Bienvenue {capitalize(user.prénom)} !
          </h1>
          <div className={styles.profileSection}>
            <div className={styles.profileInfo}>
              {isEditing ? (
                <div className={styles.editInput}>
                  <input
                    className={styles.input}
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={editedData.nom}
                    onChange={handleInputChange}
                  />
                  <input
                    className={styles.input}
                    type="text"
                    name="prénom"
                    placeholder="Prénom"
                    value={editedData.prénom}
                    onChange={handleInputChange}
                  />
                  <input
                    className={styles.input}
                    type="text"
                    name="rue"
                    placeholder="Rue"
                    value={editedData.rue}
                    onChange={handleInputChange}
                  />
                  <input
                    className={styles.input}
                    type="text"
                    name="codePostal"
                    placeholder="Code Postal"
                    value={editedData.codePostal}
                    onChange={handleInputChange}
                  />
                  <input
                    className={styles.input}
                    type="text"
                    name="ville"
                    placeholder="Ville"
                    value={editedData.ville}
                    onChange={handleInputChange}
                  />
                  <input
                    className={styles.input}
                    type="text"
                    name="mail"
                    placeholder="Email"
                    value={editedData.mail}
                    onChange={handleInputChange}
                  />
                  <input
                    className={styles.input}
                    type="text"
                    name="téléphone"
                    placeholder="Téléphone"
                    value={editedData.téléphone}
                    onChange={handleInputChange}
                  />
                </div>
              ) : (
                <div className={styles.editInput}>
                  <p className={styles.nom}>{capitalize(user.nom)}</p>
                  <p>{capitalize(user.prénom)}</p>
                  <p>{user.rue}</p>
                  <p>{user.codePostal}</p>
                  <p>{user.ville}</p>
                  <p>{user.mail}</p>
                  <p>{user.téléphone}</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.buttonsOfChange}>
            <div className={styles.changesButton}>
              <button
                className={styles.editButton}
                onClick={isEditing ? handleSaveChanges : handleEditClick}
              >
                <img
                  src={
                    isEditing
                      ? "./images/enregistrer.png"
                      : "./images/modifier.png"
                  }
                  alt={isEditing ? "Enregistrer" : "Modifier"}
                  className={styles.icon}
                />
              </button>
              <CSSTransition
                in={showPasswordModal}
                timeout={300}
                classNames="fade"
                unmountOnExit
              >
                <div className={styles.modal}>
                  {showPasswordModal && (
                    <PasswordModal
                      closeModal={() => setShowPasswordModal(false)}
                      passwords={passwords}
                      handlePasswordChange={handlePasswordChange}
                      showPassword={showPassword}
                      toggleShowPassword={toggleShowPassword}
                      handleSavePassword={handleSaveChangesPassword}
                      loading={loading}
                    />
                  )}
                </div>
              </CSSTransition>
              {!showPasswordModal && (
                <button
                  className={styles.editPasswordButton}
                  onClick={() => setShowPasswordModal(true)}
                >
                  Changer de mot de passe
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={styles.rightContent}>
          <div
            className={styles.card2}
            onClick={() => setShowPalettesModal(true)}
          >
            <h2 className={styles.nom2}>Mes palettes enregistrées</h2>
          </div>

          {showPalettesModal && (
            <PalettesModal
              palettes={palettes}
              closeModal={() => setShowPalettesModal(false)}
            />
          )}
          <div className={styles.card}>
            <h2 className={styles.nom2}>Mes 3 dernières commandes</h2>

            {orders.length === 0 ? (
              <p className={styles.profileInfoCommande}>
                Vous n'avez pas encore passé de commande.
              </p>
            ) : (
              (showAllOrders ? orders : orders.slice(0, 3)).map(
                (order, index) => (
                  <div key={index} className={styles.command}>
                    <div className={styles.line}>
                      <p>
                        Commandée le :{" "}
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p>Quantité : {order.quantité}</p>
                      <p>Total : {order.prixTotal} €</p>
                      <div className={styles.tryColors}>
                        <div className={styles.colors}>
                          {order.couleur.map((color, i) => (
                            <div
                              key={i}
                              className={styles.color}
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
          {orders.length >= 3 && (
            <button
              className={styles.plusButton}
              onClick={() => setShowAllOrders(!showAllOrders)}
            >
              <img
                src={showAllOrders ? "./images/moins.png" : "./images/plus.png"}
                alt={
                  showAllOrders ? "Réduire" : "Afficher toutes les commandes"
                }
                className={styles.icon}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Compte;
