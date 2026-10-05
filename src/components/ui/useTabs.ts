"use client";

import { useRef, useState, type KeyboardEvent } from "react";

/**
 * Accessible tabs behaviour (WAI-ARIA "tabs with automatic activation"):
 * arrow keys move between tabs, Home/End jump to the ends, and the focused
 * tab is selected. Only the selected tab is in the Tab order.
 */
export function useTabs(count: number, initial = 0) {
  const [selected, setSelected] = useState(initial);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    setSelected(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % count;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + count) % count;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = count - 1;
    if (next === null) return;
    e.preventDefault();
    focusTab(next);
  };

  const getTabProps = (index: number, ids: { tab: string; panel: string }) => ({
    ref: (el: HTMLButtonElement | null) => {
      tabRefs.current[index] = el;
    },
    id: ids.tab,
    role: "tab" as const,
    type: "button" as const,
    "aria-selected": selected === index,
    "aria-controls": ids.panel,
    tabIndex: selected === index ? 0 : -1,
    onClick: () => setSelected(index),
    onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => onKeyDown(e, index),
  });

  return { selected, setSelected, getTabProps };
}
