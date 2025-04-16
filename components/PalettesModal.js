import styles from "../styles/PalettesModal.module.css";
import PalettePreview from "./PalettePreview";

function PalettesModal({ palettes, closeModal }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Mes palettes enregistrées</h2>

        <div className={styles.list}>
          {palettes.length === 0 ? (
            <p>Aucune palette enregistrée.</p>
          ) : (
            palettes.map((colors, index) => (
              <PalettePreview key={index} colors={colors} />
            ))
          )}
        </div>

        <button className={styles.closeButton} onClick={closeModal}>
          Fermer
        </button>
      </div>
    </div>
  );
}

export default PalettesModal;