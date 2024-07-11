import { createContext, useEffect, useState } from "react";

import { getThemes } from "@/api";
import type { ThemeData } from "@/types";

import { AuthProvider } from "./provider/Auth";
import { Routes } from "./routes";

export type ThemeProp = {
  data: ThemeData[];
  isLoading: boolean;
  isError: boolean;
};

export const ThemesContext = createContext<ThemeProp>({
  data: [],
  isLoading: true,
  isError: false,
});

const App = () => {
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      try {
        const result = await getThemes();
        setThemes(result.themes);
        setError(false);
      } catch (error) {
        console.error("Error fetching themes:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  return (
    <AuthProvider>
      <ThemesContext.Provider value={{ data: themes, isLoading: isLoading, isError: isError }}>
        <Routes />
      </ThemesContext.Provider>
    </AuthProvider>
  );
};

export default App;
