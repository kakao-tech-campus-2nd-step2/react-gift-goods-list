import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";

import type { ThemeProp } from "@/App";
import { ThemesContext } from "@/App";
import { ThemeGoodsSection } from "@/components/features/Theme/ThemeGoodsSection";
import { getCurrentTheme, ThemeHeroSection } from "@/components/features/Theme/ThemeHeroSection";
import { RouterPath } from "@/routes/path";
import type { ThemeData } from "@/types";

export const ThemePage = () => {
  const { themeKey = "" } = useParams<{ themeKey: string }>();
  const ThemesApi: ThemeProp = useContext(ThemesContext);
  const themes: ThemeData[] = ThemesApi.data;
  const currentTheme = getCurrentTheme(themeKey, themes);

  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ThemeHeroSection themeKey={themeKey} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
