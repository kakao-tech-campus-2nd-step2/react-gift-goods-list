import { useParams } from 'react-router-dom';

import { HeaderSection } from '@/components/Theme/HeaderSection';
import { ItemListWithInfiniteScroll } from '@/components/Theme/ItmeList';

export default function ThemePage() {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  return (
    <>
      <HeaderSection themeKey={themeKey} />
      <ItemListWithInfiniteScroll themeKey={themeKey} />
    </>
  );
}
