"use client";

import { motion } from "framer-motion";

const TABS = ["History", "For You", "Buy", "Create"] as const;
export type Tab = (typeof TABS)[number];

export default function TopTabs({
  active = "For You",
  onChange,
}: {
  active?: Tab;
  onChange?: (tab: Tab) => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 pt-[env(safe-area-inset-top)]">
      <div className="pointer-events-auto flex items-center justify-center gap-1 px-3 pt-[calc(env(safe-area-inset-top)+3.6rem)]">
        {TABS.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              onClick={() => onChange?.(tab)}
              className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-tight transition-colors ${
                isActive ? "text-white" : "text-white/55 hover:text-white/80"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-white/12 ring-1 ring-white/15 backdrop-blur-md"
                />
              )}
              <span className="relative">{tab}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
