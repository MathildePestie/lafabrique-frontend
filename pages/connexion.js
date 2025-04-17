import { useState } from "react";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../reducers/user";
import styles from "../styles/Connexion.module.css";
import { useRouter } from "next/router";
import { resetPalette } from "../reducers/palette";

function Connexion() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://lafabrique-backend.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          const userData = {
            id: data.newDoc._id,
            token: data.newDoc.token,
            nom: data.newDoc.nom,
            prénom: data.newDoc.prénom,
            rue: data.newDoc.rue,
            codePostal: data.newDoc.codePostal,
            ville: data.newDoc.ville,
            mail: data.newDoc.mail,
            téléphone: data.newDoc.téléphone,
            commandes: data.newDoc.commandes,
          };

          dispatch(login(userData));
          localStorage.setItem("token", data.newDoc.token);
          dispatch(resetPalette());

          setFormData({ mail: "", password: "" });
          toast.success("Connexion réussie, bon retour parmi nous !");

          setTimeout(() => {
            router.push("/");
          }, 1500);
        } else {
          toast.error(`Erreur : ${data.error}`);
        }
      });
  };

  return (
    <>
      <img
        src="./images/pigments.png"
        alt="Pigments"
        className={styles.photo}
      />
      <div className={styles.signinContainer}>
        <>
          <Toaster position="top-center" reverseOrder={false} />
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
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
              Se connecter
            </button>
            <div className={styles.hyperlink}>
              <p className={styles.linkText}>Pas encore de compte ?</p>
              <a href="/inscription" className={styles.link}>
                Inscrivez-vous
              </a>
            </div>
          </form>
        </>
      </div>
    </>
  );
}

export default Connexion;
