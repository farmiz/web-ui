import { Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeProvider";
const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div className="bg-[#202941] w-3/4 p-3 rounded-full flex items-center justify-between text-white">
      <Sun
        size={20}
        role="button"
        onClick={() => setTheme("light")}
        className={theme === "dark" ? "" : ""}
      />
      <Moon
        size={20}
        role="button"
        onClick={() => setTheme("dark")}
        className={theme === "dark" ? "" : ""}
      />
    </div>
  );
};

export default ThemeSwitcher;
