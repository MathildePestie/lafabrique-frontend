import styles from '../styles/Accueil.module.css';
import { useRouter } from "next/router";

function Accueil() {

  const router = useRouter();

  const handleCrayon = () => {
    router.push("/Crayon");
  };

  const handlePeinture = () => {
    router.push("/Peinture");
  };

  const handleMarqueur = () => {
    router.push("/Marqueur");
  };

  const handleTag = () => {
    router.push("/Aerosol");
  };

  const handleMeilleursVentes = () => {
    router.push("/MeilleursVentes");
  };

  return (
    <div>
      <main className={styles.wrapper}>
        <h1 className={styles.title}>
        NOS PIGMENTS, VOS PROJETS.
        </h1>
        <div className={styles.menuContent}>
          <div className={styles.menu}>
            <img src="/images/crayon.png" alt="Crayons" className={styles.image} onClick={handleCrayon} />
            <p className={styles.légende}>Crayons</p>
          </div>
          <div className={styles.menu}>
            <img src="/images/marker.png" alt="Marqueurs" className={styles.image} onClick={handleMarqueur} />
            <p className={styles.légende}>Marqueurs</p>
          </div>
          <div className={styles.menu}>
            <img src="/images/pinceau.png" alt="Peintures" className={styles.image} onClick={handlePeinture}  />
            <p className={styles.légende}>Peintures</p>
          </div>
          <div className={styles.menu}>
            <img src="/images/bombe.png" alt="Aérosol" className={styles.image} onClick={handleTag} />
            <p className={styles.légende}>Aérosols</p>
          </div>
          <div className={styles.menu}>
            <img src="/images/meilleures-ventes.png" alt="Meilleurs Ventes" className={styles.image} onClick={handleMeilleursVentes} />
            <p className={styles.légende}>Meilleurs Ventes</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Accueil;
