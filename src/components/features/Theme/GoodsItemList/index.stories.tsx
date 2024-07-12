import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import GlobalStyles from '@assets/styles';
import GoodsItemList from '.';

const meta: Meta<typeof GoodsItemList> = {
  title: 'features/Theme/GoodsItemList',
  component: GoodsItemList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <GlobalStyles />
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GoodsItemList>;

export const Default: Story = {};
