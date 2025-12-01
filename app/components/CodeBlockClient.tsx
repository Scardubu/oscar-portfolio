"use client";

import React, { ReactNode, useCallback, useState } from "react";
import { trackEvent } from "@/app/lib/analytics";

interface CodeBlockClientProps {
  language?: string;
  filename?: string;
  children: ReactNode;
}

export function CodeBlockClient({
  language,
  filename,
  children,
}: CodeBlockClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const text = React.Children.toArray(children)
      .map((child) => (typeof child === "string" ? child : ""))
      .join("");

    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        trackEvent("Blog", "CodeBlockCopy", filename || language);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        // swallow; copying is best-effort only
      });
  }, [children, filename, language]);

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-400 font-mono">
        <span>{filename || language || "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded bg-white/10 px-2 py-0.5 text-[11px] uppercase tracking-wide text-gray-200 hover:bg-white/20"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="bg-bg-secondary p-4 overflow-x-auto">
        <code
          className={`language-${language || "text"} text-sm font-mono text-gray-300`}
        >
          {children}
        </code>
      </pre>
    </div>
  );
}
