"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useCallback, useEffect, useState } from "react"
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical"
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  Undo2Icon,
  Redo2Icon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react"
import { $isHeadingNode } from "@lexical/rich-text"
import { $isListNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list"
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils"
import { ListNode } from "@lexical/list"

export default function Toolbar() {
  const [editor] = useLexicalComposerContext()
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [blockType, setBlockType] = useState("paragraph")
  const [alignment, setAlignment] = useState("left")

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderline(selection.hasFormat("underline"))
      setIsStrikethrough(selection.hasFormat("strikethrough"))

      // Check for block type
      const anchorNode = selection.anchor.getNode()
      const element = anchorNode.getKey() === "root" ? anchorNode : anchorNode.getTopLevelElementOrThrow()

      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)

      if (elementDOM !== null) {
        if ($isHeadingNode(element)) {
          const tag = element.getTag()
          setBlockType(tag)
        } else if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode)
          const listType = parentList ? parentList.getListType() : null
          setBlockType(listType === "bullet" ? "ul" : "ol")
        } else {
          setBlockType("paragraph")
        }
      }
    }
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
    )
  }, [editor, updateToolbar])

  const formatHeading = (headingSize) => {
    if (blockType === headingSize) {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "paragraph")
    } else {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, headingSize)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 mb-2 border-b border-white/30">
      <button
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="p-2 rounded hover:bg-white/20"
        aria-label="Undo"
      >
        <Undo2Icon className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="p-2 rounded hover:bg-white/20"
        aria-label="Redo"
      >
        <Redo2Icon className="w-4 h-4" />
      </button>

      <div className="w-px h-6 mx-1 bg-white/30" />

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={`p-2 rounded hover:bg-white/20 ${isBold ? "bg-white/20" : ""}`}
        aria-label="Bold"
      >
        <BoldIcon className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={`p-2 rounded hover:bg-white/20 ${isItalic ? "bg-white/20" : ""}`}
        aria-label="Italic"
      >
        <ItalicIcon className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={`p-2 rounded hover:bg-white/20 ${isUnderline ? "bg-white/20" : ""}`}
        aria-label="Underline"
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
        className={`p-2 rounded hover:bg-white/20 ${isStrikethrough ? "bg-white/20" : ""}`}
        aria-label="Strikethrough"
      >
        <StrikethroughIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-6 mx-1 bg-white/30" />

      <button
        onClick={() => formatHeading("h1")}
        className={`p-2 rounded hover:bg-white/20 ${blockType === "h1" ? "bg-white/20" : ""}`}
        aria-label="Heading 1"
      >
        <Heading1 className="w-4 h-4" />
      </button>

      <button
        onClick={() => formatHeading("h2")}
        className={`p-2 rounded hover:bg-white/20 ${blockType === "h2" ? "bg-white/20" : ""}`}
        aria-label="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>

      <button
        onClick={() => formatHeading("h3")}
        className={`p-2 rounded hover:bg-white/20 ${blockType === "h3" ? "bg-white/20" : ""}`}
        aria-label="Heading 3"
      >
        <Heading3 className="w-4 h-4" />
      </button>

      <div className="w-px h-6 mx-1 bg-white/30" />

      <button
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        className={`p-2 rounded hover:bg-white/20 ${blockType === "ul" ? "bg-white/20" : ""}`}
        aria-label="Bullet List"
      >
        <ListIcon className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        className={`p-2 rounded hover:bg-white/20 ${blockType === "ol" ? "bg-white/20" : ""}`}
        aria-label="Numbered List"
      >
        <ListOrderedIcon className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "quote")}
        className={`p-2 rounded hover:bg-white/20 ${blockType === "quote" ? "bg-white/20" : ""}`}
        aria-label="Quote"
      >
        <QuoteIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-6 mx-1 bg-white/30" />

      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        className={`p-2 rounded hover:bg-white/20 ${alignment === "left" ? "bg-white/20" : ""}`}
        aria-label="Align Left"
      >
        <AlignLeftIcon className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
        className={`p-2 rounded hover:bg-white/20 ${alignment === "center" ? "bg-white/20" : ""}`}
        aria-label="Align Center"
      >
        <AlignCenterIcon className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
        className={`p-2 rounded hover:bg-white/20 ${alignment === "right" ? "bg-white/20" : ""}`}
        aria-label="Align Right"
      >
        <AlignRightIcon className="w-4 h-4" />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")}
        className={`p-2 rounded hover:bg-white/20 ${alignment === "justify" ? "bg-white/20" : ""}`}
        aria-label="Justify"
      >
        <AlignJustifyIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

