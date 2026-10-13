import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { HtmlBlockView } from "./html-block-view";

export type HtmlBlockAttrs = {
  html: string;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    htmlBlock: {
      insertHtmlBlock: (html: string) => ReturnType;
      updateHtmlBlock: (html: string) => ReturnType;
    };
  }
}

export const HtmlBlock = Node.create({
  name: "htmlBlock",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      html: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="html-block"]',
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) return false;
          return { html: el.getAttribute("data-html") ?? el.innerHTML };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "html-block",
        "data-html": HTMLAttributes.html,
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(HtmlBlockView);
  },

  addCommands() {
    return {
      insertHtmlBlock:
        (html: string) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: { html },
          }),
      updateHtmlBlock:
        (html: string) =>
        ({ commands }) =>
          commands.updateAttributes(this.name, { html }),
    };
  },
});
