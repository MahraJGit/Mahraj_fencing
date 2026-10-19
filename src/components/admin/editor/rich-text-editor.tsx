"use client";

import { useCallback, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link2,
  ImageIcon,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HtmlBlock } from "./html-block-extension";
import { HtmlBlockModal } from "./html-block-modal";
import { ImageInsertModal } from "./image-insert-modal";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your article...",
}: RichTextEditorProps) {
  const [htmlOpen, setHtmlOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-md",
        },
      }),
      Placeholder.configure({ placeholder }),
      HtmlBlock,
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose-admin h-[420px] max-w-none overflow-y-auto px-4 py-3 outline-none focus:outline-none",
      },
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const isTextAligned = (alignment: string) =>
    editor.isActive("paragraph", { textAlign: alignment }) ||
    editor.isActive("heading", { textAlign: alignment });

  return (
    <div className="overflow-hidden rounded-xl border border-[#c5c9a8] bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface-alt px-2 py-2">
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
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          label="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolBtn>
        <Sep />
        <ToolBtn
          active={isTextAligned("left")}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          label="Align left"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          active={isTextAligned("center")}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          label="Align center"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          active={isTextAligned("right")}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          label="Align right"
        >
          <AlignRight className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          active={isTextAligned("justify")}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          label="Justify"
        >
          <AlignJustify className="h-4 w-4" />
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
          label="Ordered list"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label="Quote"
        >
          <Quote className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          label="Code"
        >
          <Code className="h-4 w-4" />
        </ToolBtn>
        <Sep />
        <ToolBtn active={editor.isActive("link")} onClick={setLink} label="Link">
          <Link2 className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn onClick={() => setImageOpen(true)} label="Image">
          <ImageIcon className="h-4 w-4" />
        </ToolBtn>
        <ToolBtn
          active={false}
          onClick={() => setHtmlOpen(true)}
          label="HTML block"
          className="bg-[#e8e4d9] font-semibold text-ink hover:bg-[#ddd8c8]"
        >
          <Code2 className="h-4 w-4" />
          HTML
        </ToolBtn>
      </div>
      <EditorContent editor={editor} />
      <HtmlBlockModal
        open={htmlOpen}
        onClose={() => setHtmlOpen(false)}
        onInsert={(html) => {
          editor.chain().focus().insertHtmlBlock(html).run();
        }}
      />
      <ImageInsertModal
        open={imageOpen}
        onClose={() => setImageOpen(false)}
        onInsert={(src, alt) => {
          editor
            .chain()
            .focus()
            .setImage({ src, alt: alt || undefined })
            .run();
        }}
      />
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
      onMouseDown={(event) => event.preventDefault()}
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
