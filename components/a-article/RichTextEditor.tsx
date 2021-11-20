// @ts-ignore
import ImageResize from 'quill-image-resize-module-react'
import React, { useEffect, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

Quill.register('modules/imageResize', ImageResize)

const modules = {
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  },
  toolbar: [
    [{ header: [1, 2, , 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
  ]
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align'
]

interface RichTextEditorProps {
  content: string
  onContentChange: (content: string) => void
}

const RichTextEditor = ({ content, onContentChange }: RichTextEditorProps) => {
  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      theme="snow"
      value={content}
      className="self"
      onChange={onContentChange}
      style={{
        wordBreak: 'break-word',
        height: 640,
        border: 'none'
      }}
    />
  )
}

export default RichTextEditor
