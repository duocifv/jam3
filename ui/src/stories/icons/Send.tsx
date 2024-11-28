import * as React from 'react'
import type { SVGProps } from 'react'
const SvgSend = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    fill={props.color || 'currentColor'}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="send_svg__feather send_svg__feather-send"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
  </svg>
)
export default SvgSend
