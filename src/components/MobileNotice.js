"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "habctrl-desktop-notice-seen";

export default function MobileNotice() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setOpen(true);
  }, [pathname]);

  useEffect(() => {
    setOpen(pathname === "/");
  }, [pathname]);

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "28rem",
          padding: "2rem",
          borderRadius: "0.75rem",
          borderLeft: "8px solid #73b3e7",
          backgroundColor: "var(--color-primary, #005ea2)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          color: "#ffffff",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#ffffff",
          }}
        >
          Notice
        </p>
        <p
          style={{
            margin: "1.25rem 0 0",
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "#ffffff",
          }}
        >
          This site is currently optimized for desktop viewing. A
          mobile-friendly version is coming soon.
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{
            marginTop: "1.5rem",
            padding: "0.6rem 1.5rem",
            border: "none",
            borderRadius: "0.375rem",
            backgroundColor: "#ffffff",
            color: "#005ea2",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Continue to site
        </button>
      </div>
    </div>
  );
}
