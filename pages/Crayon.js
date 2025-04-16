import styles from "../styles/Crayon.module.css";
import Header from "../components/Header";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import CrayonSlider from "../components/CrayonSlider";
import ColorPicker from "../components/ColorPicker";

function Crayon() {
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
          <h1 className={styles.title}>Crayons</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.sliderContainer}>
            <CrayonSlider />
          </div>
          <div className={styles.pickerContainer}>
            <ColorPicker />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Crayon;
