"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Type,
} from "lucide-react"
import FontSelector from "./font-selector"

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null)
  const fontButtonRef = useRef<HTMLButtonElement>(null)
  const [currentFont, setCurrentFont] = useState("Inter")
  const [showFontSelector, setShowFontSelector] = useState(false)
  const [editorContent, setEditorContent] = useState("<p>Start typing here...</p>")

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const handleFontChange = (fontName: string, fontVariable: string) => {
    setCurrentFont(fontName)
    document.execCommand("fontName", false, fontName)

    // Apply the font to the selected text via CSS variable
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const span = document.createElement("span")
      span.style.fontFamily = `var(${fontVariable})`

      range.surroundContents(span)
    }

    setShowFontSelector(false)
  }

  // Save editor content when it changes
  const handleEditorChange = () => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML)
    }
  }

  // Close font selector when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    if (
      fontButtonRef.current &&
      !fontButtonRef.current.contains(e.target as Node) &&
      !document.getElementById("font-dropdown")?.contains(e.target as Node)
    ) {
      setShowFontSelector(false)
    }
  }

  // Add and remove event listener for clicking outside
  useEffect(() => {
    if (showFontSelector) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showFontSelector])

  return (
    <div className="relative flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex-1 flex flex-col backdrop-blur-xl bg-white/30 border border-white/50 rounded-xl shadow-lg overflow-hidden">
        {/* Editor Toolbar */}
        <div className="p-2 border-b border-white/30 relative">
          <div className="flex flex-wrap items-center gap-1">
            <button onClick={() => execCommand("bold")} className="p-2 rounded hover:bg-white/20" aria-label="Bold">
              <Bold className="w-4 h-4" />
            </button>

            <button onClick={() => execCommand("italic")} className="p-2 rounded hover:bg-white/20" aria-label="Italic">
              <Italic className="w-4 h-4" />
            </button>

            <button
              onClick={() => execCommand("underline")}
              className="p-2 rounded hover:bg-white/20"
              aria-label="Underline"
            >
              <Underline className="w-4 h-4" />
            </button>

            <div className="w-px h-6 mx-1 bg-white/30" />

            <button
              onClick={() => execCommand("formatBlock", "<h1>")}
              className="p-2 rounded hover:bg-white/20"
              aria-label="Heading 1"
            >
              <Heading1 className="w-4 h-4" />
            </button>

            <button
              onClick={() => execCommand("formatBlock", "<h2>")}
              className="p-2 rounded hover:bg-white/20"
              aria-label="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => execCommand("formatBlock", "<h3>")}
              className="p-2 rounded hover:bg-white/20"
              aria-label="Heading 3"
            >
              <Heading3 className="w-4 h-4" />
            </button>

            <div className="w-px h-6 mx-1 bg-white/30" />

            <button
              onClick={() => execCommand("insertUnorderedList")}
              className="p-2 rounded hover:bg-white/20"
              aria-label="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>

            <button
              onClick={() => execCommand("insertOrderedList")}
              className="p-2 rounded hover:bg-white/20"
              aria-label="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            <div className="w-px h-6 mx-1 bg-white/30" />

            <button
              onClick={() => execCommand("justifyLeft")}
              className="p-2 rounded hover:bg-white/20"
              aria-label="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => execCommand("justifyCenter")}
              className="p-2 rounded hover:bg-white/20"
              aria-label="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </button>

            <button
              onClick={() => execCommand("justifyRight")}
              className="p-2 rounded hover:bg-white/20"
              aria-label="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => execCommand("justifyFull")}
              className="p-2 rounded hover:bg-white/20"
              aria-label="Justify"
            >
              <AlignJustify className="w-4 h-4" />
            </button>

            <div className="w-px h-6 mx-1 bg-white/30" />

            <div className="relative">
              <button
                ref={fontButtonRef}
                onClick={() => setShowFontSelector(!showFontSelector)}
                className="p-2 rounded hover:bg-white/20 flex items-center gap-1"
                aria-label="Font"
              >
                <Type className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{currentFont}</span>
              </button>

              {/* Font Dropdown - Enhanced Glassmorphic Style */}
              {showFontSelector && (
                <div
                  id="font-dropdown"
                  className="font-dropdown-glassmorphic absolute left-0 top-full mt-2 z-50 w-64 max-h-80 overflow-y-auto"
                >
                  <FontSelector onFontChange={handleFontChange} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-auto">
          <div
            ref={editorRef}
            className="p-4 min-h-full focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
            contentEditable
            suppressContentEditableWarning
            style={{ fontFamily: `var(--font-${currentFont.toLowerCase().replace(/\s+/g, "-")})` }}
            onInput={handleEditorChange}
            onFocus={(e) => {
              // Make sure the cursor is visible when clicking in the editor
              if (e.target.innerHTML === "") {
                e.target.innerHTML = "<p><br></p>"
              }
            }}
            dangerouslySetInnerHTML={{ __html: editorContent }}
          />
        </div>
      </div>
    </div>
  )
}

