import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PrimeReact from "primereact/api";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { configureUseSubscription } from "@hooks";
import { configureGoFetch } from "./utils/goFetch";

PrimeReact.ripple = true;
configureUseSubscription({ persistInLocalStorage: true });
configureGoFetch({
  corsMode: "cors",
  credentials: "omit",
  defaultResponseParser: async (r: Response) => await r.json(),
  defaultErrorHandler: (err, resolve, reject) => {
    reject("Could not fetch data");
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
