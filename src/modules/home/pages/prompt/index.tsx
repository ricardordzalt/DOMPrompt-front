/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { GetNewHtml, getNewHtml } from "../../../../api/prompt/get-new-html";
import { useMutation } from "@tanstack/react-query";
import styles from "./Prompt.module.css";

const getUpdatedHTML = (
  iframeRef: React.RefObject<HTMLIFrameElement | null>
) => {
  let updatedHTML = "";
  if (iframeRef.current) {
    const iframeDoc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow?.document;
    updatedHTML = iframeDoc?.documentElement?.outerHTML || "";
  }
  return updatedHTML;
};

const Prompt = () => {
  const { mutateAsync, isPending, error, data } = useMutation<any, Error, GetNewHtml>({
    mutationFn: getNewHtml,
  });
  const renderedHTML = data?.html;
  const [prompt, setPrompt] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSend = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    try {
      const currentHTML = getUpdatedHTML(iframeRef);
      await mutateAsync({ prompt, currentHTML });
      setPrompt(""); // Reset prompt after success
    } catch (e) {
      console.error("Error occurred:", e);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className={styles.container}>
        <h1 className={styles.header}>ChatRender</h1>

        {/* Prompt */}
        <h2>What can I help with?...</h2>
        <form className={styles.promptSection} onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Message ChatRender"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className={styles.input}
            disabled={isPending}
          />
          <button
            type="submit"
            className={styles.button}
            disabled={isPending}
          >
            Send
          </button>
        </form>
        {error ? <p className={styles.error}>{error?.message}</p> : null}
      </div>

      <iframe
        ref={iframeRef}
        title="HTML Renderer"
        sandbox="allow-same-origin allow-scripts allow-forms"
        srcDoc={renderedHTML}
        className={styles.iframe}
      />
    </div>
  );
};

export default Prompt;
