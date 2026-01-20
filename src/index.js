import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./styles.css"; // 既存のCSS
import "./styles-mobile.css"; // ★追加: スマホ用CSS（下にある方が優先される）

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
