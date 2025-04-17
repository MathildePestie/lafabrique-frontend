import styles from "../styles/CrayonSlider.module.css";
import { useState, useRef, useEffect } from "react";

function CrayonSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const data = [
    { image: "/images/tag-1.png", title: "Aérosol-1" },
    { image: "/images/tag-2.png", title: "Aérosol-2" },
    { image: "/images/tag-3.png", title: "Aérosol-3" },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      if (!container) return;
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setCurrentIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index) => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.offsetWidth;
    container.scrollTo({ left: index * width, behavior: "smooth" });
    setCurrentIndex(index);
  };

  return (
    <div className={styles.slider}>
      <div className={styles.cardsContainer} ref={containerRef}>
        {data.map((card, index) => (
          <div className={styles.card} key={index}>
            <img src={card.image} alt={card.title} className={styles.image} />
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {data.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ""}`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default CrayonSlider;