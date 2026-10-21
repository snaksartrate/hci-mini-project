import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StateProvider } from "./context/StateContext";
import { HistoryProvider } from "./context/HistoryContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StateProvider>
      <HistoryProvider>
        <App />
      </HistoryProvider>
    </StateProvider>
  </React.StrictMode>
);
