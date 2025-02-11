"use client";

import React from "react";
import { DiscussionEmbed } from "disqus-react";
import { cn } from "@/lib/utils";

export function Comments({
  pathname,
  identifier,
  title,
  className,
}: {
  pathname: string;
  identifier: string;
  title: string;
  className?: React.HTMLProps<HTMLDivElement>["className"];
}) {
  return (
    <div className={cn("caret-transparent", className)}>
      <DiscussionEmbed
        shortname={`nekomovies-xyz`}
        config={{
          url: `https://www.nekomovies.xyz/${pathname}`,
          identifier: identifier, // pathname
          title: title,
        }}
      />
    </div>
  );
}
