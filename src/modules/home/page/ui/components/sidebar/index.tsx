import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faBorderAll,
} from "@fortawesome/free-solid-svg-icons";
import AppIcon from "../../../../assets/icons/app-icon.svg";

const SideBar = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <div className={styles.sidebar}>
          <a href="#" className={styles.AppIcon}>
            <AppIcon />
          </a>
          <ul className={styles.siderbarOptions}>
            <li className={styles.siderbarOption}>
              <a href="#" className={styles.siderbarLink}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  size="2x"
                  color="var(--icon-color)"
                  fixedWidth
                />
              </a>
            </li>
            <li className={styles.siderbarOption}>
              <a href="#" className={styles.siderbarLink}>
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
    </div>
  );
};

export { SideBar };
