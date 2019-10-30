import { $dom } from "src/common/DOMHelpers";

export const getSelectionRanges = () => {
  const selection = window.getSelection();
  if (selection === null) {
    return null;
  }

  const selectionRanges = [];
  for (let idx = 0; idx < selection.rangeCount; idx++) {
    selectionRanges.push(selection.getRangeAt(idx));
  }
  return selectionRanges;
};

export const restoreSelection = (selectionRanges: Range[] | null) => {
  if (selectionRanges === null || selectionRanges.length === 0) {
    return;
  }

  const selection = window.getSelection();
  if (selection !== null) {
    selection.removeAllRanges();
    selectionRanges.forEach(range => selection.addRange(range));
  }
};

export class SelectionUtils {
  public static bindTextSelection(
    $el: HTMLElement,
    handler: (rect: ClientRect | null) => any
  ) {
    if (!$dom.matches($el, "[contenteditable]")) {
      return;
    }

    $el.addEventListener("mouseup", () => {
      setTimeout(() => {
        const rect = this.getSelectionRect();
        handler(rect);
      }, 0);
    });

    $el.addEventListener("keyup", () => {
      const rect = this.getSelectionRect();
      handler(rect);
    });
  }

  private static getSelectionRect() {
    const selection = window.getSelection();
    if (selection === null) {
      return null;
    }

    const range = selection.getRangeAt(0);
    return range.getBoundingClientRect();
  }
}