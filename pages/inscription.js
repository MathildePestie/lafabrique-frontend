import { useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../reducers/user";
import styles from "../styles/Insciption.module.css";
import { useRouter } from "next/router";

function Inscription() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nom: "",
    prénom: "",
    rue: "",
    codePostal: "",
    ville: "",
    téléphone: "",
    mail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://lafabrique-backend.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          const userData = {
            id: data.newDoc.userId,
            token: data.newDoc.token,
            nom: data.newDoc.userNom,
            prénom: data.newDoc.userPrénom,
            rue: data.newDoc.userRue,
            codePostal: data.newDoc.userCodePostal,
            ville: data.newDoc.userVille,
            mail: data.newDoc.userMail,
            téléphone: data.newDoc.userTéléphone,
            commandes: data.newDoc.userCommandes,
          };

          dispatch(login(userData));
          localStorage.setItem("token", data.newDoc.token);

          toast.success("Inscription réussie, bienvenue chez La Fabrique !");

          setTimeout(() => {
            router.push("/");
          }, 1500);
        } else {
          toast.error(`Erreur : ${data.error}`);
        }
      })
      .catch((err) => {
        console.error("Erreur fetch:", err);
        toast.error("Oups, une erreur est survenue");
      });
  };

  return (
    <>
      <img
        src="./images/pigments.png"
        alt="Pigments"
        className={styles.photo}
      />
      <div className={styles.container}>
        <div className={styles.signinContainer}>
          <>
            <Toaster position="top-center" reverseOrder={false} />
            <img
              src="./images/pigments.png"
              alt="Pigments"
              className={styles.photo}
            />
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label}>Nom</label>
                <input
                  className={styles.input}
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Nom"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Prénom</label>
                <input
                  className={styles.input}
                  type="text"
                  name="prénom"
                  value={formData.prénom}
                  onChange={handleChange}
                  placeholder="Prénom"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Rue</label>
                <input
                  className={styles.input}
                  type="text"
                  name="rue"
                  value={formData.rue}
                  onChange={handleChange}
                  placeholder="Entrez le numéro et le nom de votre rue"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Code Postal</label>
                <input
                  className={styles.input}
                  type="text"
                  name="codePostal"
                  value={formData.codePostal}
                  onChange={handleChange}
                  placeholder="Code Postal"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Ville</label>
                <input
                  className={styles.input}
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  placeholder="Entrez le nom de votre ville"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Téléphone</label>
                <input
                  className={styles.input}
                  type="text"
                  name="téléphone"
                  value={formData.téléphone}
                  onChange={handleChange}
                  placeholder="Entrez votre numéro de téléphone"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  type="mail"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  placeholder="Entrez votre email"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Mot de passe</label>
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Entrez votre mot de passe"
                  required
                />
              </div>
              <button className={styles.submitButton} type="submit">
                S'inscrire
              </button>
              <div className={styles.hyperlink}>
                <p className={styles.linkText}>Déjà un compte ?</p>
                <a href="/connexion" className={styles.link}>
                  Connectez-vous
                </a>
              </div>
            </form>
          </>
        </div>
      </div>
    </>
  );
}

export default Inscription;
