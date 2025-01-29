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
      <nav className={styles.navigation} aria-label="Topbar navigation">
        <div className={styles.topbarMobile}>
          <ul className={styles.siderbarOptions} role="menu" aria-label="Quick actions">
            <li role="menuitem">
              <a href="#" aria-label="New chat">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  color="var(--icon-color)"
                  className={`${styles.smallIcon} ${styles.firstSmallIcon}`}
                />
              </a>
            </li>
            <li role="menuitem">
              <a href="#" aria-label="My apps">
                <FontAwesomeIcon
                  icon={faBorderAll}
                  color="var(--icon-color)"
                  className={styles.smallIcon}
                />
              </a>
            </li>
          </ul>
          <span className={styles.topbarLogoContainer} aria-label="Home">
            <AppIcon style={{ width: "1.25rem", height: "1.25rem" }} />
            <p className={styles.topbarLogoTitle}>Chat Render</p>
          </span>
          <a href="#logout" aria-label="Log out">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              color="var(--icon-color)"
              className={styles.smallIcon}
            />
          </a>
        </div>


        <span className={styles.topbarDesktop}>
          <p className={styles.topbarLogoTitle}>Chat Render</p>
          <a href="#logout" aria-label="Log out">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              color="var(--icon-color)"
              className={styles.smallIcon}
              size="2x"
            />
          </a>
        </span>

      </nav>
    </div>
  );
};

export { TopBar };