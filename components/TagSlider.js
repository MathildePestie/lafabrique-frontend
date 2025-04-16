import styles from "../styles/CrayonSlider.module.css";
import { useState } from "react";

function TagSlider() {
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
      image: "/images/tag-1.png",
      title: "Aérosol-1",
    },
    {
      image: "/images/tag-2.png",
      title: "Aérosol-2",
    },
    {
      image: "/images/tag-3.png",
      title: "Aérosol-3",
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

export default TagSlider;
