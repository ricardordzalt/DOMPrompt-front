import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faBorderAll } from "@fortawesome/free-solid-svg-icons";
import AppIcon from "../../../../assets/icons/app-icon.svg?react";

interface SideBarProps {
  onClickNewRender: VoidFunction;
  onClickApplications: VoidFunction;
}

const SideBar = ({ onClickNewRender, onClickApplications }: SideBarProps) => {
  return (
    <div className={styles.container}>
      <nav className={styles.navigation} aria-label="Sidebar navigation">
        <div className={styles.sidebar}>
          <a href="/" aria-label="Home">
            <AppIcon />
          </a>
          <ul className={styles.siderbarOptions} role="menu">
            <li className={styles.siderbarOption} role="menuitem">
              <button
                className={styles.siderbarButton}
                onClick={onClickNewRender}
                title="New render"
                aria-label="Start a new render"
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  color="var(--icon-color)"
                  fixedWidth
                  className={styles.icon}
                />
              </button>
            </li>
            <li className={styles.siderbarOption} role="menuitem">
              <button
                className={styles.siderbarButton}
                onClick={onClickApplications}
                title="My applications"
                aria-label="Display a modal with saved applications"
              >
                <FontAwesomeIcon
                  icon={faBorderAll}
                  color="var(--icon-color)"
                  fixedWidth
                  className={styles.icon}
                />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export { SideBar };
