import styles from "../styles/CrayonSlider.module.css";
import { useState } from "react";

function MarqueurSlider() {
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
      image: "/images/marqueur-1.png",
      title: "Marqueur-1",
    },
    {
      image: "/images/marqueur-2.png",
      title: "Marqueur-2",
    },
    {
      image: "/images/marqueurs-3.png",
      title: "Marqueur-3",
    },
  ];

  return (
    <div className={styles.slider}>
      <button className={styles.leftArrow} onClick={handlePrev}>
        <img
          src="/images/flèche.png"
          alt="précédent"
          style={{ width: "50px" }}
        />
      </button>
      <div className={styles.cardsContainer}>
        {data.map((card, index) => (
          <div
            key={index}
            className={styles.card}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <img src={card.image} alt={card.title} className={styles.image} />
          </div>
        ))}
      </div>

      <button className={styles.rightArrow} onClick={handleNext}>
        <img
          src="/images/flèche.png"
          alt="suivant"
          style={{ transform: "rotate(180deg)", width: "50px" }}
        />
      </button>
    </div>
  );
}

export default MarqueurSlider;
