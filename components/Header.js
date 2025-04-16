import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import { useState } from "react";

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleCompteClick = () => {
    if (!user.token) {
      router.push("/connexion");
    } else {
      router.push("/compte");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleHome = () => {
    router.push("/");
  };

  const handlePanierClick = () => {
    router.push("/cart");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {menuOpen && (
          <div className={styles.dropdownMenu}>
            <p onClick={() => router.push("/Crayon")}>Crayons</p>
            <p onClick={() => router.push("/Marqueur")}>Marqueurs</p>
            <p onClick={() => router.push("/Peinture")}>Peintures</p>
            <p onClick={() => router.push("/Aerosol")}>Aérosols</p>
            <p onClick={() => router.push("/MeilleursVentes")}>
              Meilleures ventes
            </p>
          </div>
        )}
        <div className={styles.leftIcons}>
          <img
            className={styles.iconM}
            src="./images/menu.png"
            alt="menu"
            onClick={toggleMenu}
          />
        </div>
        <img
          className={styles.logo}
          src="./images/logo.png"
          alt="logo"
          onClick={handleHome}
        />
        <div className={styles.icons}>
          <img
            className={styles.icon}
            src="./images/règlement.png"
            alt="panier"
            onClick={handlePanierClick}
          />
          <img
            className={styles.icon}
            src="./images/compte.png"
            alt="compte-client"
            onClick={handleCompteClick}
          />
          {user.token && (
            <img
              className={styles.icon}
              src="./images/logout.png"
              alt="logout"
              onClick={handleLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
