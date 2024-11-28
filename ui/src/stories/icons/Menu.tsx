import * as React from 'react'
import type { SVGProps } from 'react'
const SvgMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    fill={props.color || 'currentColor'}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="menu_svg__feather menu_svg__feather-menu"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
)
export default SvgMenu
