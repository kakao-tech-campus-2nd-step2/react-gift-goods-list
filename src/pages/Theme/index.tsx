import React from 'react';
import Layout from '@components/features/Layout';
import { GoodsItemList, ThemeHeader } from '@components/features/Theme';

export default function Theme() {
  return (
    <Layout>
      <ThemeHeader />
      <GoodsItemList />
    </Layout>
  );
}
