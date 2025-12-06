"use client";

import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { trackEvent } from "@/app/lib/analytics";

interface CodeBlockClientProps {
  language?: string;
  filename?: string;
  children: ReactNode;
}

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  bash: "Bash",
  sh: "Shell",
  jsx: "React JSX",
  tsx: "React TSX",
  json: "JSON",
  yaml: "YAML",
  yml: "YAML",
  sql: "SQL",
  dockerfile: "Dockerfile",
};

export function CodeBlockClient({
  language,
  filename,
  children,
}: CodeBlockClientProps) {
  const [copied, setCopied] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(false);

  const codeText = useMemo(
    () =>
      React.Children.toArray(children)
        .map((child) => (typeof child === "string" ? child : ""))
        .join(""),
    [children],
  );

  const lines = useMemo(() => codeText.split(/\r?\n/), [codeText]);

  const normalizedLanguage = (language || "text").toLowerCase();
  const displayLanguage = LANGUAGE_LABELS[normalizedLanguage] ||
    (normalizedLanguage === "text" ? "Code" : normalizedLanguage.toUpperCase());

  const handleCopy = useCallback(() => {
    if (!codeText) return;

    navigator.clipboard
      .writeText(codeText)
      .then(() => {
        setCopied(true);
        trackEvent("Blog", "CodeBlockCopy", filename || language || "unknown");
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        // swallow; copying is best-effort only
      });
  }, [codeText, filename, language]);

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-white/10 bg-bg-secondary/80">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-gray-300">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-200">
            {displayLanguage}
          </span>
          {filename && (
            <span className="truncate text-[11px] text-gray-400" title={filename}>
              {filename}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowLineNumbers((prev) => !prev)}
            className="hidden rounded bg-white/5 px-2 py-0.5 text-[11px] uppercase tracking-wide text-gray-300 hover:bg-white/15 sm:inline-flex"
          >
            {showLineNumbers ? "Hide Lines" : "Show Lines"}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded bg-white/10 px-2 py-0.5 text-[11px] uppercase tracking-wide text-gray-200 hover:bg-white/20"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {showLineNumbers ? (
        <pre className="overflow-x-auto bg-bg-secondary p-4">
          {lines.map((line, index) => (
            <div
              key={index}
              className="flex min-w-full whitespace-pre text-sm font-mono text-gray-300"
            >
              <span className="select-none pr-3 text-right text-xs text-gray-500/80 w-10">
                {index + 1}
              </span>
              <code className="flex-1 whitespace-pre">
                {line === "" ? " " : line}
              </code>
            </div>
          ))}
        </pre>
      ) : (
        <pre className="overflow-x-auto bg-bg-secondary p-4">
          <code className="text-sm font-mono text-gray-300">
            {codeText}
          </code>
        </pre>
      )}
    </div>
  );
}
