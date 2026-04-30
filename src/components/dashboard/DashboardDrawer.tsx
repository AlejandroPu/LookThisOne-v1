'use client';

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';

type Props = {
  menuLabel: string;
  children: ReactNode;
};

function HamburgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 5h14M3 10h14M3 15h14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 4l12 12M16 4L4 16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DashboardDrawer({ menuLabel, children }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    btnRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <>
      {/* Mobile top bar */}
      <div className="border-border bg-dark fixed top-0 right-0 left-0 z-50 flex h-14 items-center justify-between border-b border-white/10 px-4 md:hidden">
        <span className="font-syne text-off-white text-[17px] font-extrabold tracking-tight">
          Dashboard
        </span>
        <button
          ref={btnRef}
          type="button"
          aria-label={menuLabel}
          aria-expanded={open}
          aria-controls="dashboard-drawer"
          onClick={() => setOpen((v) => !v)}
          className="text-off-white flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-white/10"
        >
          {open ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Spacer so page content doesn't hide under the fixed top bar */}
      <div className="h-14 md:hidden" aria-hidden="true" />

      {/* Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            aria-hidden="true"
            onClick={close}
          />
          <aside
            id="dashboard-drawer"
            className="bg-dark fixed top-0 left-0 z-50 flex h-full w-64 flex-col shadow-2xl md:hidden"
          >
            {children}
          </aside>
        </>
      )}
    </>
  );
}
