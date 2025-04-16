import styles from "../styles/PaletteLibraryModal.module.css";
import PalettePreview from "./PalettePreview";

function PaletteLibraryModal({ palettes, handleImport, closeModal }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Ma bibliothèque de palettes</h2>

        <div className={styles.list}>
          {palettes.length === 0 ? (
            <p>Aucune palette enregistrée.</p>
          ) : (
            palettes.map((colors, index) => (
              <div 
                key={index}
                className={styles.card}
                onClick={() => handleImport(colors)}
              >
                <PalettePreview colors={colors} />
                <p>Clique pour importer</p>
              </div>
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

export default PaletteLibraryModal;