"use client";

import { Song } from "@/app/page";
import { Button } from "./button";
import useAttachmentStyle from "@/hooks/useAttachmentStyle";

type AttachmentStyleViewerProps = {
  songs: Song[];
};

const AttachmentStyleViewer = ({ songs }: AttachmentStyleViewerProps) => {
  const { result, isLoading, error, classifyAttachmentStyle } =
    useAttachmentStyle();

  const handleClick = async () => {
    await classifyAttachmentStyle(songs);
  };

  return (
    <div className="flex flex-col">
      <Button size="lg" onClick={handleClick} disabled={isLoading}>
        {isLoading ? "Classifying..." : "Get attachment style"}
      </Button>
      {error && <div>Error: {error}</div>}
      {result && (
        <div className="mt-4">
          <h3 className="inline-block">
            Attachment Style: <span className="font-semibold">{result}</span>
          </h3>
        </div>
      )}
    </div>
  );
};

export { AttachmentStyleViewer };
