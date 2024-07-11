import type { Meta, StoryObj } from '@storybook/react';

import LoadingUI from './index';

const meta = {
    title: 'Common/LoadingUI',
    component: LoadingUI,
    tags: ['autodocs'],
    render: () => (
        <div>
            rhdiddl
            <LoadingUI />
        </div>
    ),
} satisfies Meta<typeof LoadingUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
