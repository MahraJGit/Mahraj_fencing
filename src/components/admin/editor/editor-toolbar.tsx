"use client";

import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Type,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Code2,
  ListTree,
} from "lucide-react";
import { cn } from "@/lib/utils";

type EditorToolbarProps = {
  editor: Editor;
  onLink: () => void;
  onImage: () => void;
  onHtml: () => void;
  onToc: () => void;
};

export function EditorToolbar({
  editor,
  onLink,
  onImage,
  onHtml,
  onToc,
}: EditorToolbarProps) {
  const isBody =
    !editor.isActive("heading") &&
    !editor.isActive("bulletList") &&
    !editor.isActive("orderedList");

  return (
    <div className="sticky top-14 z-20 flex flex-wrap items-center gap-1 border-b border-border bg-surface-alt/95 px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-surface-alt/90">
      <ToolBtn
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        label="Bold"
      >
        <Bold className="h-4 w-4" />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        label="Italic"
      >
        <Italic className="h-4 w-4" />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        label="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </ToolBtn>

      <Sep />

      <ToolBtn
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        label="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
        <span className="hidden sm:inline">H1</span>
      </ToolBtn>
      <ToolBtn
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        label="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
        <span className="hidden sm:inline">H2</span>
      </ToolBtn>
      <ToolBtn
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        label="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
        <span className="hidden sm:inline">H3</span>
      </ToolBtn>
      <ToolBtn
        active={editor.isActive("heading", { level: 4 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        label="Heading 4"
      >
        <Heading4 className="h-4 w-4" />
        <span className="hidden sm:inline">H4</span>
      </ToolBtn>
      <ToolBtn
        active={isBody && editor.isActive("paragraph")}
        onClick={() => editor.chain().focus().setParagraph().run()}
        label="Body text"
      >
        <Type className="h-4 w-4" />
        <span className="hidden sm:inline">Body</span>
      </ToolBtn>

      <Sep />

      <ToolBtn
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        label="Bullet list"
      >
        <List className="h-4 w-4" />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        label="Numbered list"
      >
        <ListOrdered className="h-4 w-4" />
      </ToolBtn>

      <Sep />

      <ToolBtn active={editor.isActive("link")} onClick={onLink} label="Insert link">
        <Link2 className="h-4 w-4" />
        <span className="hidden sm:inline">Link</span>
      </ToolBtn>
      <ToolBtn onClick={onImage} label="Insert image">
        <ImageIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Image</span>
      </ToolBtn>
      <ToolBtn onClick={onToc} label="Insert table of contents">
        <ListTree className="h-4 w-4" />
        <span className="hidden sm:inline">TOC</span>
      </ToolBtn>
      <ToolBtn
        onClick={onHtml}
        label="HTML embed"
        className="bg-[#e8e4d9] font-semibold text-ink hover:bg-[#ddd8c8]"
      >
        <Code2 className="h-4 w-4" />
        HTML
      </ToolBtn>
    </div>
  );
}

function Sep() {
  return <span className="mx-1 h-5 w-px bg-border" aria-hidden />;
}

function ToolBtn({
  children,
  onClick,
  active,
  label,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-ink hover:bg-background",
        active && "bg-background shadow-sm",
        className,
      )}
    >
      {children}
    </button>
  );
}
