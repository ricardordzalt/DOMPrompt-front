import { useState, useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [renderedHTML, setRenderedHTML] = useState("");

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getUpdatedHTML = () => {
    let updatedHTML = ''
    if (iframeRef.current) {
      const iframeDoc =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow?.document;
      updatedHTML = iframeDoc?.documentElement?.outerHTML || '';
    }
    return updatedHTML;
  };

  const handleSend = async () => {
    const updatedDOM = getUpdatedHTML();
    const newHTML = await getNewHtml(prompt, updatedDOM);
    setRenderedHTML(newHTML);
    setPrompt("");
  };
  
  const getNewHtml = async (prompt: string, currentHTML: string) => {
    const response = await fetch(`${API_URL}/react-gpt`, {
      method: "POST",
      body: JSON.stringify({
        prompt,
        currentHTML,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    const html = json.html;
    return html;
  };

  return (
    <div style={{ height: '100vh'}}>
      <div style={styles.container}>
        <h1 style={styles.header}>WebPrompt</h1>

        {/* Prompt */}
        <h2>What can I help with?...</h2>
        <div style={styles.promptSection}>
          <input
            type="text"
            placeholder="Message WebPrompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSend} style={styles.button}>
            Send
          </button>
        </div>
      </div>

      <iframe
        ref={iframeRef}
        title="HTML Renderer"
        sandbox="allow-same-origin allow-scripts allow-forms"
        srcDoc={renderedHTML}
        style={{ width: "100%", height: "100%", border: "1px solid transparent" }}
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
    textAlign: 'center' as const,
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

export default App;
