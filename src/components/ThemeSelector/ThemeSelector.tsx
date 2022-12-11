import { useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { getCurrentData, publish } from "@hooks";
import { StateTopics } from "@utils";
import "./_styles.scss";

export default function ThemeSelector({}) {
  const [theme, setTheme] = useState(
    getCurrentData<string>(StateTopics.Theme) || "light"
  );

  const handleChange = (t: string) => {
    setTheme(t);
    publish(StateTopics.Theme, t);
  };

  return (
    <div className="theme-container">
      <i className="pi pi-sun" />
      <InputSwitch
        checked={theme === "dark"}
        onChange={(e) => handleChange(e.value ? "dark" : "light")}
      />
      <i className="pi pi-moon" />
    </div>
  );
}
