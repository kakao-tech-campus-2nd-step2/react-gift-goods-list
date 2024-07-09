import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";

import { ThemesContext } from "@/App";
import { ThemeGoodsSection } from "@/components/features/Theme/ThemeGoodsSection";
import { getCurrentTheme, ThemeHeroSection } from "@/components/features/Theme/ThemeHeroSection";
import { RouterPath } from "@/routes/path";

export const ThemePage = () => {
  const { themeKey = "" } = useParams<{ themeKey: string }>();
  const themes = useContext(ThemesContext);
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
