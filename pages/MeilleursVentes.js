import styles from "../styles/MeilleursVentes.module.css";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { add } from "../reducers/cart";

const produits = [
  {
    nom: "Palette Crayons Assortis - 10 pièces",
    prix: 25,
    type: "crayon",
    image: "/images/10-crayon.png",
  },
  {
    nom: "Palette Marqueurs Assortis - 10 pièces",
    prix: 45,
    type: "marqueur",
    image: "/images/10-marqueur.png",
  },
  {
    nom: "Palette Peintures Assortis - 10 pièces",
    prix: 40,
    type: "peinture",
    image: "/images/10-peinture.png",
  },
  {
    nom: "Palette Aérosols Assortis - 10 pièces",
    prix: 80,
    type: "aérosol",
    image: "/images/10-tag.png",
  },
  {
    nom: "Palette Crayons Assortis - 20 pièces",
    prix: 50,
    type: "crayon",
    image: "/images/20-crayon.png",
  },
  {
    nom: "Palette Marqueurs Assortis - 20 pièces",
    prix: 90,
    type: "marqueur",
    image: "/images/20-marqueur.png",
  },
  {
    nom: "Palette Peintures Assortis - 20 pièces",
    prix: 80,
    type: "peinture",
    image: "/images/20-peinture.png",
  },
  {
    nom: "Palette Aérosols Assortis - 20 pièces",
    prix: 160,
    type: "aérosol",
    image: "/images/20-tag.png",
  },
  {
    nom: "Palette Crayons Assortis - 20 pièces",
    prix: 100,
    type: "crayon",
    image: "/images/50-crayon.png",
  },
  {
    nom: "Palette Marqueurs Assortis - 20 pièces",
    prix: 180,
    type: "marqueur",
    image: "/images/50-marqueur.png",
  },
  {
    nom: "Palette Peintures Assortis - 50 pièces",
    prix: 160,
    type: "peinture",
    image: "/images/50-peinture.png",
  },
  {
    nom: "Palette Aérosols Assortis - 50 pièces",
    prix: 320,
    type: "aérosol",
    image: "/images/50-tag.png",
  },
];

function MeilleursVentes() {
  const dispatch = useDispatch();

  const ajouterAuPanier = (produit) => {
    dispatch(
      add({
        type: produit.type,
        couleur: produit.couleur,
        quantité: produit.couleur.length,
        prixTotal: produit.prix,
      })
    );
  };

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Les meilleures ventes</h1>
        <div className={styles.grid}>
          {produits.map((produit, index) => (
            <div className={styles.card} key={index}>
              <img src={produit.image} alt={produit.nom} className={styles.img} />
              <h2 className={styles.nom}>{produit.nom}</h2>
              <p className={styles.prix}>{produit.prix} €</p>
              <button className={styles.btn} onClick={() => ajouterAuPanier(produit)}>
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
        <div className={styles.breathe}></div>
      </div>
    </>
  );
}

export default MeilleursVentes;