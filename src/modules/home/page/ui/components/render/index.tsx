import Loader from "../../../../../../common/components/loader";
import styles from "./index.module.css";

interface RenderProps {
  render: string;
  ref: React.Ref<HTMLIFrameElement>;
  isLoading: boolean;
}

const Render = ({ render, ref, isLoading }: RenderProps) => {
  return (
    <span
      className={
        isLoading ? `${styles.container} ${styles.opacity}` : styles.container
      }
    >
      {isLoading ? (
        <span className={styles.loaderContainer}>
          <Loader />
        </span>
      ) : null}
      <iframe
        ref={ref}
        title="HTML Renderer"
        sandbox="allow-same-origin allow-scripts allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-storage-access-by-user-activation allow-downloads allow-downloads-without-user-activation allow-presentation"
        srcDoc={render}
        className={styles.render}
      />
    </span>
  );
};

export { Render };
