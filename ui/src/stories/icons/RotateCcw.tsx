import * as React from 'react'
import type { SVGProps } from 'react'
const SvgRotateCcw = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    fill={props.color || 'currentColor'}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="rotate-ccw_svg__feather rotate-ccw_svg__feather-rotate-ccw"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M1 4v6h6" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
)
export default SvgRotateCcw
