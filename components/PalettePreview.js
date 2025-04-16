import styles from "../styles/PalettePreview.module.css";

const PalettePreview = ({ colors }) => {
  return (
    <div className={styles.palettePreview}>
      {colors.map((color, i) => (
        <div
          key={i}
          className={styles.colorSample}
          style={{ backgroundColor: color }}
          title={color}
        ></div>
      ))}
    </div>
  );
};

export default PalettePreview;
