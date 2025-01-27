/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SideBar } from "./components/sidebar";

const UIHome = ({
  handleSend,
  setPrompt,
  isPending,
  prompt,
  error,
  iframeRef,
  renderedHTML,
}: any) => {
  return <SideBar/>
  // return (
  //   <div className={styles.app}>
  //     <div className={styles.container}>
  //       <h1 className={styles.header}>ChatRender</h1>

  //       {/* Prompt */}
  //       <h2>What can I help with?...</h2>
  //       <form className={styles.promptSection} onSubmit={handleSend}>
  //         <input
  //           type="text"
  //           placeholder="Message ChatRender"
  //           value={prompt}
  //           onChange={(e) => setPrompt(e.target.value)}
  //           className={styles.input}
  //           disabled={isPending}
  //         />
  //         <button type="submit" className={styles.button} disabled={isPending}>
  //           Send
  //         </button>
  //       </form>
  //       {error ? <p className={styles.error}>{error?.message}</p> : null}
  //     </div>

  //     <iframe
  //       ref={iframeRef}
  //       title="HTML Renderer"
  //       sandbox="allow-same-origin allow-scripts allow-forms"
  //       srcDoc={renderedHTML}
  //       className={styles.iframe}
  //     />
  //     <FontAwesomeIcon icon={faPenToSquare} />
  //   </div>
  // );
};

export { UIHome };
