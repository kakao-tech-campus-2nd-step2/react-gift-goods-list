import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useFilter } from '@context/filter/useFilter';
import Wish, { WishProps } from '.';

const meta: Meta<WishProps> = {
  title: 'features/Home/Filter/Wish',
  component: Wish,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<WishProps>;

function WishWithFilterHooks(args: WishProps) {
  const { selectedWish, selectWish } = useFilter();

  return <Wish {...args} selectedWish={selectedWish} selectWish={selectWish} />;
}

export const Default: Story = {
  render: (args) => <WishWithFilterHooks {...args} />,
  args: {
    selectedWish: 'MANY_RECEIVE',
  },
};
