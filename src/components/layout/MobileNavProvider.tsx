"use client";

import * as React from "react";
import { BottomNav } from "./BottomNav";
import { SearchOverlay } from "./SearchOverlay";

/**
 * MobileNavProvider — Wraps BottomNav + SearchOverlay together.
 * Manages the search open/close state and hides bottom nav when search is open.
 */
export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <>
      {children}
      {/* Hide bottom nav when search overlay is open */}
      {!searchOpen && <BottomNav onSearchOpen={() => setSearchOpen(true)} />}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}