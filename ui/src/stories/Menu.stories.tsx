import type { Meta, StoryObj } from '@storybook/react'

import SvgSettings from './icons/Settings'
import { Menu, MenuItem } from './Menu'

const meta = {
  title: 'Example/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'select' },
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: (
      <>
        <MenuItem
          icon={<SvgSettings width={64} height={64} fill="red" />}
          title="Flyout Menus"
          body="featuring icons, multiple sections, and content previews. These menu examples are designed and built by the Tailw"
        />
        <MenuItem
          icon={<SvgSettings width={64} height={64} fill="red" />}
          title="Flyout Menus"
          body="featuring icons, multiple sections, and content previews. These menu examples are designed and built by the Tailw"
        />
        <MenuItem
          icon={<SvgSettings width={64} height={64} fill="red" />}
          title="Flyout Menus"
          body="featuring icons, multiple sections, and content previews. These menu examples are designed and built by the Tailw"
        />
      </>
    ),
  },
}
