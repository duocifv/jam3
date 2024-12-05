import type { Meta, StoryObj } from '@storybook/react'
import Picture from '.'



const meta = {
  title: 'Example/Text',
  component: Picture,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Picture>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    className: "text-lg p-4 border-1 w-40",
  },
}
