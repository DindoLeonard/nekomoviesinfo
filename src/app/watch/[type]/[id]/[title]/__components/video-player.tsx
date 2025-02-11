"use client";

import { cn } from "@/lib/utils";

export default function VideoPlayerVidSrc({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const handleIframeLoad = () => {
    const iframe = document.getElementById("yourIframe") as any;
    // Access the contentWindow of the iframe
    const iframeWindow = iframe?.contentWindow;

    // Add an event listener to the document inside the iframe
    iframeWindow.document.addEventListener("click", (event: any) => {
      // Check if the clicked element is an anchor tag
      if (event.target.tagName === "A") {
        // Prevent the default behavior (e.g., opening a new window or navigating)
        event.preventDefault();
        // Additional logic if needed
      }
    });
  };
  return (
    <div id="youIFrame" className={cn(["w-full lg:h-[90vh]", className])}>
      {/* <VideoPlayer src={src} /> */}
      <iframe
        className={cn(["w-full lg:h-[90vh]", className])}
        src={src}
        allowFullScreen
        onClick={handleIframeLoad}
      />
    </div>
  );
}
