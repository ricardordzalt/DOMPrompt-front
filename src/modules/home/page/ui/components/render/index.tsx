import styles from "./index.module.css";

const Render = ({ html, ref }: {html: string; ref: React.Ref<HTMLIFrameElement> }) => {
  return (
    <iframe
      ref={ref}
      title="HTML Renderer"
      sandbox="allow-same-origin allow-scripts allow-forms"
      srcDoc={html}
      className={styles.container}
    />
  );
};

export { Render };
