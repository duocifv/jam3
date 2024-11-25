'use client'
import { useMemo } from 'react'
import sanitizeHtml from 'sanitize-html'
import { IOptions } from 'sanitize-html'

interface SafeHTMLRendererProps {
  node: string
  className: string
}

const sanitizeOptions: IOptions = {
  allowedTags: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'a',
    'ul',
    'ol',
    'li',
    'b',
    'i',
    'strong',
    'em',
    'img',
    'blockquote',
    'code',
    'pre',
    'hr',
    'br',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'title'],
    blockquote: ['cite'],
    code: ['class'],
  },
  allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
  disallowedTagsMode: 'discard',
  selfClosing: [
    'img',
    'br',
    'hr',
    'area',
    'base',
    'basefont',
    'input',
    'link',
    'meta',
  ],
}

const InnerHTML = ({ node, className }: SafeHTMLRendererProps) => {
  const sanitizedContent = useMemo(() => {
    return sanitizeHtml(node, sanitizeOptions)
  }, [node])

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
}

export default InnerHTML
