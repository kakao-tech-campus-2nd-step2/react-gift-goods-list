import { createContext } from "react";
import { useQuery } from "react-query";

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
  const { data: themes, isLoading, isError } = useQuery<ThemeData[]>("themes", getThemes);
  return (
    <AuthProvider>
      <ThemesContext.Provider
        value={{ data: themes ? themes : [], isLoading: isLoading, isError: isError }}
      >
        <Routes />
      </ThemesContext.Provider>
    </AuthProvider>
  );
};

export default App;
