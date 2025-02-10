import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

interface RenderButtonsProps {
  onClickCopyRender: VoidFunction;
  onClickSaveRender: VoidFunction;
}

const RenderButtons = ({
  onClickCopyRender,
  onClickSaveRender,
}: RenderButtonsProps) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={onClickCopyRender}>
        <FontAwesomeIcon
          icon={faCopy}
          color="var(--icon-color)"
          fixedWidth
          className={`${styles.icon} ${styles.firstIcon}`}
        />
      </button>
      <button className={styles.button} onClick={onClickSaveRender}>
        <FontAwesomeIcon
          icon={faFloppyDisk}
          color="var(--icon-color)"
          fixedWidth
          className={styles.icon}
        />
      </button>
    </div>
  );
};

export default RenderButtons;
