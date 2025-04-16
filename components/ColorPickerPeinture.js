import { useState } from "react";
import { add } from "../reducers/cart";
import styles from "../styles/ColorPicker.module.css";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { savePalette } from "../reducers/palette";
import PaletteLibraryModal from "./PaletteLibraryModal";
import router from "next/router";
import { useRouter } from 'next/router';

function ColorPickerPeinture() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [palette, setPalette] = useState([]);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const type = router.pathname.replace("/", "");
  const palettes = useSelector((state) => state.palette.value);
  const [showLibrary, setShowLibrary] = useState(false);

  const handleValidatePalette = () => {
    fetch("https://lafabrique-backend.vercel.app/orders/save-palette", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, couleurs: palette }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(savePalette(palette));
          toast.success("Palette enregistrée avec succès !");
          setPalette([]);
        }
      });
  };

  const handleImportPalette = (colors) => {
    setPalette(colors);
    setShowLibrary(false);
    toast.success("Palette importée avec succès !");
  };

  return (
    <div className={styles.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className={styles.title}>Personnalise ta couleur</h2>

      <div className={styles.barContainer}>
        <label>Teinte</label>
        <div className={styles.sliderWrapper}>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(e.target.value)}
            className={styles.hiddenRange}
            style={{ "--value": `${hue}` }}
          />
          <div className={styles.hueGradient}></div>
          <div
            className={styles.thumb}
            style={{ left: `${(hue / 360) * 100}%` }}
          />
        </div>
      </div>

      <div className={styles.barContainer}>
        <label>Saturation</label>
        <div className={styles.sliderWrapper}>
          <input
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={(e) => setSaturation(e.target.value)}
            className={styles.hiddenRange}
            style={{ "--value": `${saturation}` }}
          />
          <div className={styles.saturationGradient}></div>
          <div className={styles.thumb} style={{ left: `${saturation}%` }} />
        </div>
      </div>

      <div
        className={styles.preview}
        style={{
          backgroundColor: `hsl(${hue}, ${saturation}%, 50%)`,
        }}
      ></div>
      <button
        className={styles.addButton}
        onClick={() => {
          const newColor = `hsl(${hue}, ${saturation}%, 50%)`;
          setPalette([...palette, newColor]);
        }}
      >
        Ajouter à ma palette
      </button>
      <div className={styles.palette}>
        {palette.map((color, index) => (
          <div key={index} className={styles.colorCardWrapper}>
            <div
              className={styles.colorCard}
              style={{ backgroundColor: color }}
            ></div>
            <span
              className={styles.deleteButton}
              onClick={() => {
                const newPalette = [...palette];
                newPalette.splice(index, 1);
                setPalette(newPalette);
              }}
            >
              ✖
            </span>
          </div>
        ))}
      </div>
      {palette.length > 0 && (
        <div className={styles.bigCard}>
          <h3 className={styles.bigCardTitle}>Ma palette sur-mesure</h3>
          <div className={styles.colorsWrapper}>
            {palette.map((color, index) => (
              <div
                key={index}
                className={styles.colorBubble}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
      )}
      {palette.length > 0 && (
        <button
          className={styles.validateButton}
          onClick={() => handleValidatePalette()}
        >
          Valider ma palette
        </button>
      )}
      <button
        className={styles.libraryButton}
        onClick={() => setShowLibrary(true)}
      >
        Ma bibliothèque de palettes
      </button>

      {showLibrary && (
        <PaletteLibraryModal
          palettes={palettes}
          handleImport={handleImportPalette}
          closeModal={() => setShowLibrary(false)}
        />
      )}
      <div className={styles.counters}>
        <p className={styles.counter}>Quantité : {palette.length}</p>
        <p className={styles.counter}>Prix total : {palette.length * 5} €</p>
      </div>
      {palette.length > 0 && (
        <button
          className={styles.cartButton}
          onClick={() => {
            dispatch(
              add({
                type,
                couleur: palette,
                quantité: palette.length,
                prixTotal: palette.length * 6,
              })
            );
            toast.success("Ta palette a bien été ajoutée au panier !");
            setPalette([]);
            setHue(0);
            setSaturation(100);
          }}
        >
          Ajouter au panier
        </button>
      )}
    </div>
  );
}

export default ColorPickerPeinture;