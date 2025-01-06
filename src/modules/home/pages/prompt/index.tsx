/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { GetNewHtml, getNewHtml } from "../../../../api/prompt/get-new-html";
import { useMutation } from "@tanstack/react-query";

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
      <div style={styles.container}>
        <h1 style={styles.header}>ChatRender</h1>

        {/* Prompt */}
        <h2>What can I help with?...</h2>
        <form style={styles.promptSection} onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Message ChatRender"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={styles.input}
            disabled={isPending}
          />
          <button
            type="submit"
            style={
              isPending
                ? { ...styles.button, ...styles.disabledButton }
                : styles.button
            }
            disabled={isPending}
          >
            Send
          </button>
        </form>
        {error ? <p style={{ color: "#f00" }}>{error?.message}</p> : null}
      </div>

      <iframe
        ref={iframeRef}
        title="HTML Renderer"
        sandbox="allow-same-origin allow-scripts allow-forms"
        srcDoc={renderedHTML}
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid transparent",
        }}
      />
    </div>
  );
};

/**
 * Estilos
 */
const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f8f8",
    border: "1px solid #ddd",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column" as const,
  },
  header: {
    color: "#3333dd",
    marginBottom: "10px",
    textAlign: "center" as const,
  },
  promptSection: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#3333dd",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  disabledButton: {
    backgroundColor: "#6666dd",
  },
  editableContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
  },
  instructions: {
    fontSize: "14px",
    color: "#333",
    marginBottom: "8px",
  },
  editableArea: {
    flexGrow: 1,
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    backgroundColor: "#fff",
    overflowY: "auto",
  },
};

export default Prompt;
