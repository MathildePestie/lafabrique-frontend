import styles from "../styles/Slider.module.css";
import { useState } from "react";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const data = [
    {
      image: "/images/slider1.png",
      title: "Explosion de Pigments",
      text: "Laissez libre cours à votre créativité avec nos pigments 100% naturels.",
    },
    {
      image: "/images/slider2.png",
      title: "Crayons Personnalisés",
      text: "Composez vos propres palettes de couleurs avec précision.",
    },
    {
      image: "/images/slider3.png",
      title: "Spray Artisanal",
      text: "Des bombes conçues en France pour un rendu authentique et vibrant.",
    },
    {
      image: "/images/slider4.png",
      title: "Au coeur de la création",
      text: "Vos outils, vos couleurs, votre style. Créez sans limites.",
    },
    {
      image: "/images/slider5.png",
      title: "Pigments & Passion",
      text: "Une matière brute, naturelle, qui sublime vos inspirations.",
    },
  ];

  return (
    <div className={styles.slider}>
      <button className={styles.leftArrow} onClick={handlePrev}>
        <img
          src="/images/flèche.png"
          alt="précédent"
          style={{ width: "50px", height: "50px" }}
        />
      </button>
      <div className={styles.cardsContainer}>
        {data.map((card, index) => (
          <div
            key={index}
            className={styles.card}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <div className={styles.content}>
              <img src={card.image} alt={card.title} className={styles.image} />
              <p className={styles.légende}>{card.text}</p>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.rightArrow} onClick={handleNext}>
        <img
          src="/images/flèche.png"
          alt="suivant"
          style={{ transform: "rotate(180deg)", width: "50px", height: "50px" }}
        />
      </button>
    </div>
  );
}

export default Slider;
