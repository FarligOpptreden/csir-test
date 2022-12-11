import { useState } from "react";
import { classNameBuilder, StateTopics } from "@utils";
import { getCurrentData, useSubscription } from "@hooks";
import "./_styles.scss";

export default function Logo({}) {
  const [theme, setTheme] = useState(
    getCurrentData<string>(StateTopics.Theme) || "light"
  );

  useSubscription<string>(StateTopics.Theme, (t) => setTheme(t));

  return <div className={classNameBuilder("app-logo", theme)}></div>;
}
