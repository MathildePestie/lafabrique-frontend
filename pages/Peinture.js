import styles from "../styles/Crayon.module.css";
import Header from "../components/Header";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import PeintureSlider from "../components/PeintureSlider";
import ColorPickerPeinture from "../components/ColorPickerPeinture";

function Peinture() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);

  const handleSelectionClick = () => {
    setIsEditing(true);
  };

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.leftContent}>
          <h1 className={styles.title}>Peinture</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.sliderContainer}>
            <PeintureSlider />
          </div>
          <div className={styles.pickerContainer}>
            <ColorPickerPeinture />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Peinture;