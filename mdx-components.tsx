import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { CodeBlockClient } from "@/app/components/CodeBlockClient";

// Custom components for MDX content
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default elements with styled versions
    h1: ({ children }: { children?: ReactNode }) => (
      <h1 className="text-3xl font-bold text-white mt-8 mb-4 tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: ReactNode }) => (
      <h2 className="text-2xl font-semibold text-white mt-8 mb-3 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: ReactNode }) => (
      <h3 className="text-xl font-semibold text-white mt-6 mb-2">{children}</h3>
    ),
    p: ({ children }: { children?: ReactNode }) => (
      <p className="mb-4 text-base leading-7 text-gray-300">{children}</p>
    ),
    a: ({ href, children }: { href?: string; children?: ReactNode }) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-primary underline underline-offset-2 hover:text-accent-primary/80 transition-colors"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href || "#"}
          className="text-accent-primary underline underline-offset-2 hover:text-accent-primary/80 transition-colors"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }: { children?: ReactNode }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }: { children?: ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    ul: ({ children }: { children?: ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">
        {children}
      </ul>
    ),
    ol: ({ children }: { children?: ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">
        {children}
      </ol>
    ),
    li: ({ children }: { children?: ReactNode }) => (
      <li className="text-gray-300">{children}</li>
    ),
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="border-l-4 border-accent-primary/50 pl-4 py-2 my-6 bg-white/5 rounded-r-lg italic text-gray-400">
        {children}
      </blockquote>
    ),
    code: ({ children }: { children?: ReactNode }) => (
      <code className="font-mono text-sm bg-white/10 text-accent-primary px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    pre: ({ children }: { children?: ReactNode }) => (
      <pre className="bg-bg-secondary border border-white/10 rounded-lg p-4 overflow-x-auto my-6 font-mono text-sm">
        {children}
      </pre>
    ),
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <Image
        src={src || ""}
        alt={alt || ""}
        width={800}
        height={450}
        className="rounded-lg my-6 w-full"
      />
    ),
    hr: () => <hr className="border-white/10 my-8" />,
    table: ({ children }: { children?: ReactNode }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }: { children?: ReactNode }) => (
      <th className="text-left text-white font-semibold p-3 border-b border-white/10 bg-white/5">
        {children}
      </th>
    ),
    td: ({ children }: { children?: ReactNode }) => (
      <td className="p-3 border-b border-white/10 text-gray-300">{children}</td>
    ),

    // Custom components for blog posts
    Callout: ({
      type = "info",
      children,
    }: {
      type?: "info" | "warning" | "success" | "error";
      children: ReactNode;
    }) => {
      const styles = {
        info: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
        warning: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        success: "bg-green-500/10 border-green-500/30 text-green-400",
        error: "bg-red-500/10 border-red-500/30 text-red-400",
      };
      return (
        <div className={`border-l-4 rounded-r-lg p-4 my-6 ${styles[type]}`}>
          {children}
        </div>
      );
    },

    CodeBlock: CodeBlockClient,

    ...components,
  };
}
