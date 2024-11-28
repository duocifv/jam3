import type { Meta, StoryObj } from '@storybook/react'
import SvgArrowLeftCircle from './icons/ArrowLeftCircle'
import SvgArrowRightCircle from './icons/ArrowRightCircle'
import { Menu, PhoneCall, PlusCircle, RotateCcw, Search, Send, Settings, ThumbsDown, ThumbsUp, Tool, Trash } from './icons'
import SvgMenu from './icons/Menu'
import SvgPhoneCall from './icons/PhoneCall'
import SvgTrash from './icons/Trash'
import SvgTool from './icons/Tool'
import SvgThumbsUp from './icons/ThumbsUp'
import SvgThumbsDown from './icons/ThumbsDown'
import SvgSettings from './icons/Settings'
import SvgSend from './icons/Send'
import SvgSearch from './icons/Search'
import SvgRotateCcw from './icons/RotateCcw'
import SvgPlusCircle from './icons/PlusCircle'

const meta: Meta = {
  title: 'Example/Icons',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    color: { control: 'color' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const IconGallery: Story = {
  args: {
    width: 48,
    height: 48,
    color: 'black',
  },
  render: (args) => (
    <ul style={{ fontSize: 14, textAlign: "center"}}>

      <SvgArrowLeftCircle width={args.width} height={args.height} fill={args.color} />SvgArrowLeftCircle

      <SvgArrowRightCircle width={args.width} height={args.height} fill={args.color} /> SvgArrowRightCircle

      <SvgMenu width={args.width} height={args.height} fill={args.color} />
      SvgMenu

      <SvgPhoneCall width={args.width} height={args.height} fill={args.color} />  SvgPhoneCall

      <SvgPlusCircle width={args.width} height={args.height} fill={args.color} /> SvgPlusCircle

      <SvgRotateCcw width={args.width} height={args.height} fill={args.color} /> SvgRotateCcw

      <SvgSearch width={args.width} height={args.height} fill={args.color} />
      SvgSearch

      <SvgSend width={args.width} height={args.height} fill={args.color} />
      SvgSend

      <SvgSettings width={args.width} height={args.height} fill={args.color} />
      SvgSettings

      <SvgThumbsDown width={args.width} height={args.height} fill={args.color} /> SvgThumbsDown

      <SvgThumbsUp width={args.width} height={args.height} fill={args.color} />
      SvgThumbsUp

      <SvgTool width={args.width} height={args.height} fill={args.color} />
      SvgTool

      <SvgTrash width={args.width} height={args.height} fill={args.color} />
      SvgTrash

      <SvgArrowRightCircle width={args.width} height={args.height} fill={args.color} /> SvgArrowRightCircle
      
    </ul>
  ),
}

