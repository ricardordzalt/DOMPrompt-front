import { useState } from "react";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPenToSquare,
  faBorderAll,
} from "@fortawesome/free-solid-svg-icons";
import AppIcon from "../../../../assets/icons/app-icon.svg";

const SideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      {/* Sidebar / Topbar */}
      <nav className={styles.navigation}>
        <div className={styles.topbar}>
          <button
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon
              icon={faBars}
              size="sm"
              color="var(--icon-color)"
            />
          </button>
          <span className={styles.span}>
            <AppIcon style={{ width: "1.25rem", height: "1.25rem" }} />
            <p className={styles.title}>Chat Render</p>
          </span>
          <p>User</p>
        </div>

        <div className={`${styles.sidebar} ${isMenuOpen ? styles.open : ""}`}>
          <a href="#" className={styles.AppIcon}>
            <AppIcon />
          </a>
          <ul>
            <li>
              <a href="#">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="2x"
                  color="var(--icon-color)"
                  fixedWidth
                />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon
                  icon={faBorderAll}
                  size="2x"
                  color="var(--icon-color)"
                  fixedWidth
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className={styles["content"]}>
        <header className={styles.header}>
          <h1>Let’s create!</h1>
          <input type="text" placeholder="Message ChatRender" />
        </header>
        <div className={styles["chat-box"]}>
          {/* Aquí iría el contenido del chat */}
        </div>
      </main>
    </div>
  );
};

export { SideBar };
