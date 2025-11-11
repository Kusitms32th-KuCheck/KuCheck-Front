'use client'

import DOMPurify from 'isomorphic-dompurify'

interface SessionContentProps {
  content?: string
}

export default function SessionContent({ content }: SessionContentProps) {
  if (!content) return null

  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })

  return (
    <div
      className="body-lg-regular [&_a]:text-primary-500 mt-[31px] text-gray-800 [&_a]:cursor-pointer [&_a]:hover:opacity-80"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  )
}
