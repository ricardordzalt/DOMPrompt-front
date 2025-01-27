import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faBorderAll,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import AppIcon from "../../../../assets/icons/app-icon.svg";

const TopBar = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar / Topbar */}
      <nav className={styles.navigation}>
        <div className={styles.topbar}>
          <ul className={styles.siderbarOptions}>
            <li>
              <a href="#">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  color="var(--icon-color)"
                  className={`${styles.smallIcon} ${styles.firstSmallIcon}`}
                />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon
                  icon={faBorderAll}
                  color="var(--icon-color)"
                  className={styles.smallIcon}
                />
              </a>
            </li>
          </ul>
          <span className={styles.topbarLogoContainer}>
            <AppIcon style={{ width: "1.25rem", height: "1.25rem" }} />
            <p className={styles.topbarLogoTitle}>Chat Render</p>
          </span>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            color="var(--icon-color)"
            className={styles.smallIcon}
          />
        </div>
      </nav>
    </div>
  );
};

export { TopBar };
