import { Navigate, useParams } from "react-router-dom";

import { ThemeGoodsSection } from "@/components/features/Theme/ThemeGoodsSection";
import { getCurrentTheme, ThemeHeroSection } from "@/components/features/Theme/ThemeHeroSection";
import { RouterPath } from "@/routes/path";
import { ThemeMockList } from "@/types/mock";

export const ThemePage = () => {
  const { themeKey = "" } = useParams<{ themeKey: string }>();
  const currentTheme = getCurrentTheme(themeKey, ThemeMockList);

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
