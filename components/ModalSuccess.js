import styles from '../styles/ModalSuccess.module.css';

function ModalSuccess({ onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Merci pour votre commande !</h1>
        <p className={styles.text}>Votre paiement a bien été enregistré.</p>
        <button className={styles.button} onClick={onClose}>Retour à l'accueil</button>
      </div>
    </div>
  );
}

export default ModalSuccess;