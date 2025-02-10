import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faBorderAll,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import AppIcon from "../../../../assets/icons/app-icon.svg?react";

interface TopBarProps {
  onClickNewRender: VoidFunction;
  onClickRenders: VoidFunction;
  onClickLogout: VoidFunction;
}

const TopBar = ({ onClickNewRender, onClickRenders, onClickLogout }: TopBarProps) => {
  return (
    <div className={styles.container}>
      {/* Sidebar / Topbar */}
      <nav className={styles.navigation} aria-label="Topbar navigation">
        <div className={styles.topbarMobile}>
          <ul
            className={styles.siderbarOptions}
            role="menu"
            aria-label="Quick actions"
          >
            <li role="menuitem">
              <button
                className={styles.topbarButton}
                onClick={onClickNewRender}
                title="New render"
                aria-label="Start a new render"
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  color="var(--icon-color)"
                  className={`${styles.smallIcon} ${styles.firstSmallIcon}`}
                />
              </button>
            </li>
            <li role="menuitem">
              <button
                className={styles.topbarButton}
                onClick={onClickRenders}
                title="My renders"
                aria-label="Display a modal with saved renders"
              >
                <FontAwesomeIcon
                  icon={faBorderAll}
                  color="var(--icon-color)"
                  className={styles.smallIcon}
                />
              </button>
            </li>
          </ul>
          <span className={styles.topbarLogoContainer} aria-label="Home">
            <AppIcon style={{ width: "1.25rem", height: "1.25rem" }} />
            <p className={styles.topbarLogoTitle}>Chat Render</p>
          </span>
          <button
            className={styles.topbarButton}
            onClick={onClickLogout}
            title="Log out"
            aria-label="Log out user from application"
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              color="var(--icon-color)"
              className={styles.smallIcon}
            />
          </button>
        </div>

        <span className={styles.topbarDesktop}>
          <p className={styles.topbarLogoTitle}>Chat Render</p>
          <button
            className={styles.topbarButton}
            onClick={onClickLogout}
            title="Log out"
            aria-label="Log out user from application"
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              color="var(--icon-color)"
              className={styles.icon}
            />
          </button>
        </span>
      </nav>
    </div>
  );
};

export { TopBar };
