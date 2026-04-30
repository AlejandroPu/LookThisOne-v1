'use client';

import { createContext, useContext } from 'react';

export const DrawerCloseContext = createContext<(() => void) | null>(null);

export function useDrawerClose() {
  return useContext(DrawerCloseContext);
}
