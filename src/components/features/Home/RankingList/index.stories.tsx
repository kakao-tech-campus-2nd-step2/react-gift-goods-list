import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import FilterProvider from '@context/filter/FilterProvider';
import RankingList from '.';

const meta: Meta<typeof RankingList> = {
  title: 'features/Home/RankingList',
  component: RankingList,
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

type Story = StoryObj<typeof RankingList>;

export const Default: Story = {};
