"use client";

import * as React from "react";
import { BottomNav } from "./BottomNav";
import { SearchOverlay } from "./SearchOverlay";

/**
 * MobileNavProvider — Wraps BottomNav + SearchOverlay together.
 * Manages the search open/close state.
 */
export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <>
      {children}
      <BottomNav onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}