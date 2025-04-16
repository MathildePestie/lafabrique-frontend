import styles from "../styles/PasswordModal.module.css";

function PasswordModal({
  closeModal,
  passwords,
  handlePasswordChange,
  showPassword,
  toggleShowPassword,
  handleSavePassword,
  loading,
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Modifier le mot de passe</h2>
        <div className={styles.input}>
          <input
            className={styles.text}
            autoComplete="off"
            type={showPassword.current ? "text" : "password"}
            name="currentPassword"
            placeholder="Mot de passe actuel"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => toggleShowPassword("current")}
          >
            <img className={styles.voir} src="./images/eye.svg" alt="voir" />
          </button>
        </div>
        <div className={styles.input}>
          <input
            className={styles.text}
            type={showPassword.new ? "text" : "password"}
            name="newPassword"
            placeholder="Nouveau mot de passe"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => toggleShowPassword("current")}
          >
            <img className={styles.voir} src="./images/eye.svg" alt="voir" />
          </button>
        </div>
        <div className={styles.input}>
          <input
            className={styles.text}
            type={showPassword.confirm ? "text" : "password"}
            name="confirmNewPassword"
            placeholder="Confirmez le nouveau mot de passe"
            value={passwords.confirmNewPassword}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => toggleShowPassword("current")}
          >
            <img className={styles.voir} src="./images/eye.svg" alt="voir" />
          </button>
        </div>

        <div className={styles.buttons}>
          <button
            disabled={loading}
            onClick={handleSavePassword}
            className={styles.button}
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
          <button onClick={closeModal} className={styles.button}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
