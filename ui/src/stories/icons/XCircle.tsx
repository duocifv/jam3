import * as React from 'react'
import type { SVGProps } from 'react'
const SvgXCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 24}
    height={props.height || 24}
    fill={props.color || 'currentColor'}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="x-circle_svg__feather x-circle_svg__feather-x-circle"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <path d="m15 9-6 6M9 9l6 6" />
  </svg>
)
export default SvgXCircle
