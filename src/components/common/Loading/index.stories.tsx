import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from './index';

// 메타 설정
const meta: Meta<typeof Loading> = {
  title: 'Components/Common/Loading',
  component: Loading,
  argTypes: {
    message: {
      control: 'text',
      description: 'Displays a loading message',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    message: 'Loading...',
  },
};

// 사용자 정의 메시지 스토리
export const WithCustomMessage: Story = {
  args: {
    message: '데이터를 불러오는 중입니다...',
  },
};
