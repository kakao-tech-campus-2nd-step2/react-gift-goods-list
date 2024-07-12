import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import FilterProvider from '@context/filter/FilterProvider';
import TrendingGifts from '.';

const meta: Meta<typeof TrendingGifts> = {
  title: 'features/Home/TrendingGifts',
  component: TrendingGifts,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <FilterProvider>
        <Story />
      </FilterProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TrendingGifts>;

export const Default: Story = {};
