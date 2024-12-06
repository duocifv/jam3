import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Text from '.'

const meta = {
  title: 'Example/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    className: 'text-lg p-4 border-1 w-40',
    copy: 'Text',
  },
}
