import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faBorderAll,
} from "@fortawesome/free-solid-svg-icons";
import AppIcon from "../../../../assets/icons/app-icon.svg?react";

const SideBar = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.navigation} aria-label="Sidebar navigation">
        <div className={styles.sidebar}>
          <a href="#" className={styles.AppIcon} aria-label="Home">
            <AppIcon />
          </a>
          <ul className={styles.siderbarOptions} role="menu">
            <li className={styles.siderbarOption} role="menuitem">
              <a 
                href="#" 
                className={styles.siderbarLink} 
                aria-label="New chat"
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  color="var(--icon-color)"
                  fixedWidth
                  className={styles.icon}
                />
              </a>
            </li>
            <li className={styles.siderbarOption} role="menuitem">
              <a 
                href="#" 
                className={styles.siderbarLink} 
                aria-label="My apps"
              >
                <FontAwesomeIcon
                  icon={faBorderAll}
                  color="var(--icon-color)"
                  fixedWidth
                  className={styles.icon}
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export { SideBar };
