import { useEffect } from "react";
import { Landing } from "@pages";
import { getCurrentData } from "@hooks";
import { StateTopics } from "@utils";
import "./styles/default.scss";
import { useSubscription } from "./hooks";

export default function App() {
  const body = document.getElementsByTagName("body")[0];

  useEffect(() => {
    const theme = getCurrentData<string>(StateTopics.Theme) || "light";
    body.className = theme;
  }, []);

  useSubscription<string>(StateTopics.Theme, (theme) => {
    body.className = theme;
  });

  return <Landing />;
}
