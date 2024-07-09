import { createContext, useEffect, useState } from "react";

import { getThemes } from "@/api";
import type { ThemeData } from "@/types";

import { AuthProvider } from "./provider/Auth";
import { Routes } from "./routes";

export const ThemesContext = createContext<ThemeData[]>([]);

const App = () => {
  const [themes, setThemes] = useState<Array<ThemeData>>([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const result = await getThemes();
        setThemes(result.themes);
      } catch (error) {
        console.error("Error fetching themes:", error);
      }
    };

    fetchThemes();
  }, []);

  return (
    <AuthProvider>
      <ThemesContext.Provider value={themes}>
        <Routes />
      </ThemesContext.Provider>
    </AuthProvider>
  );
};

export default App;
