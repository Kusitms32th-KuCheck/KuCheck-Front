'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Heading from '@tiptap/extension-heading'
import { useState, useEffect, useRef } from 'react'

import {
  Tiptap1Icon,
  Tiptap2Icon,
  Tiptap3Icon,
  Tiptap4Icon,
  Tiptap5Icon,
  Tiptap6Icon,
  Tiptap7Icon,
} from '@/assets/svgComponents/manager'

type Button = {
  name: string
  icon: React.ComponentType<{ width: number; height: number }>
  command: 'link' | ((editor: NonNullable<ReturnType<typeof useEditor>>) => void)
}

const BUTTONS: Button[] = [
  { name: 'Bold', command: (e) => e.chain().focus().toggleBold().run(), icon: Tiptap1Icon },
  { name: 'H1', command: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(), icon: Tiptap2Icon },
  { name: 'H2', command: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(), icon: Tiptap3Icon },
  { name: 'H3', command: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(), icon: Tiptap4Icon },
  { name: 'BulletList', command: (e) => e.chain().focus().toggleBulletList().run(), icon: Tiptap5Icon },
  { name: 'OrderedList', command: (e) => e.chain().focus().toggleOrderedList().run(), icon: Tiptap6Icon },
  { name: 'Link', command: 'link', icon: Tiptap7Icon },
]

type AddBodyProps = {
  content: string
  setContent: (v: string) => void
  error?: boolean
}

export default function AddBody({ content, setContent, error }: AddBodyProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)

  // 🔑 editor 값 저장용 (렌더 영향 X)
  const contentRef = useRef<string>(content)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: false,
        bulletList: false,
        heading: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],

    // ✅ 최초 1회만 content 주입
    content: isMounted ? content : '',
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      contentRef.current = html
      setContent(html) // ← 저장 목적 OK (editor로 다시 안 밀어넣음)
      setIsEmpty(editor.isEmpty)
    },
  })

  /**
   * ✅ 수정 모드 / 외부 content 변경 시에만 editor에 반영
   */
  useEffect(() => {
    if (!editor) return
    if (!content) return
    if (editor.getHTML() === content) return

    editor.commands.setContent(content, false) // selection 유지
    setIsEmpty(editor.isEmpty)
  }, [content, editor])

  if (!isMounted || !editor) return null

  const handleClick = (button: Button) => {
    editor.chain().focus()

    if (button.command === 'link') {
      const prev = editor.getAttributes('link').href
      const url = window.prompt('URL을 입력하세요:', prev || '')
      if (url === null) return
      if (url === '') {
        editor.chain().focus().unsetLink().run()
      } else {
        editor.chain().focus().setLink({ href: url }).run()
      }
    } else {
      button.command(editor)
    }
  }

  const isActive = (name: string) => {
    if (name.startsWith('H')) {
      const level = parseInt(name.slice(1))
      return editor.isActive('heading', { level })
    }
    if (name === 'Link') return editor.isActive('link')
    return editor.isActive(name.toLowerCase())
  }

  return (
    <div className="mt-6 w-full pb-6">
      <div className={`mb-6 rounded-2xl bg-white ${error && isEmpty ? 'border border-sub-red' : ''}`}>
        <div className="flex border-b">
          {BUTTONS.map((b) => {
            const Icon = b.icon
            const active = isActive(b.name)

            return (
              <button
                key={b.name}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleClick(b)}
                className={`p-[7px] transition-colors ${
                  active ? 'bg-gray-200 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
                } border-r border-gray-200`}
              >
                <Icon width={32} height={32} />
              </button>
            )
          })}
        </div>

        <div className="relative w-full min-h-[500px] max-h-[2000px] overflow-auto px-8 py-6">
          {isEmpty && (
            <p className="pointer-events-none absolute left-8 top-6 select-none text-gray-400">
              내용을 입력해 주세요...
            </p>
          )}
          <EditorContent editor={editor} className="tiptap-content w-full outline-none" />
        </div>
      </div>

      <style jsx global>{`
        .tiptap-content {
          line-height: 1.5;
          min-height: 500px;
          outline: none;
        }
        .tiptap-content .ProseMirror {
          outline: none;
        }
        .tiptap-content h1 {
          font-size: 1.75rem;
          font-weight: 700;
        }
        .tiptap-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
        }
        .tiptap-content h3 {
          font-size: 1.25rem;
          font-weight: 500;
        }
        .tiptap-content ul {
          list-style: disc;
          margin-left: 1.25rem;
        }
        .tiptap-content ol {
          list-style: decimal;
          margin-left: 1.25rem;
        }
        .tiptap-content a {
          color: #2563eb;
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
