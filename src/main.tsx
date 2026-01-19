import { createRoot } from "react-dom/client";
import { Buffer } from "buffer";
import App from "./App.tsx";
import "./index.css";

// Polyfill needed by @react-pdf/renderer in the browser (PDF preview/download)
// Must set on both globalThis and window for full compatibility
if (typeof globalThis !== "undefined") {
  (globalThis as any).Buffer = Buffer;
}
if (typeof window !== "undefined") {
  (window as any).Buffer = Buffer;
}

createRoot(document.getElementById("root")!).render(<App />);
