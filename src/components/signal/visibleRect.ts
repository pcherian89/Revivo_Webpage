/** Rect of the first element with one of these ids that is currently rendered. */
export function visibleRect(...ids: string[]): DOMRect | null {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && el.getClientRects().length > 0) return el.getBoundingClientRect();
  }
  return null;
}
