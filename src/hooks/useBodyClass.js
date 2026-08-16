import { useEffect } from 'react';

// Adds `name` to <body> while `active` is true; removes it on cleanup.
// Used for scroll-lock (menu-open / modal-open) without leaking class state.
export function useBodyClass(name, active) {
  useEffect(() => {
    if (!active) return undefined;
    document.body.classList.add(name);
    return () => document.body.classList.remove(name);
  }, [name, active]);
}
