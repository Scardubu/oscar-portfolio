"use client";

import { Share2, Twitter, Linkedin } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1 text-sm text-gray-400">
        <Share2 className="h-4 w-4" /> Share:
      </span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-white/5 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <button
        onClick={handleCopyLink}
        className="rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
      >
        Copy Link
      </button>
    </div>
  );
}
