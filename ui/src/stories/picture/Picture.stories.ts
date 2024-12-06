import type { Meta, StoryObj } from '@storybook/react';
import Picture from '.';

// Định nghĩa metadata cho câu chuyện này
const meta = {
  title: 'Example/Text',
  component: Picture,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Picture>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "text-lg p-4 border-1 w-40", 
    src: 'https://example.com/image.jpg',  
    alt: 'Example Image',                   
  },
};
