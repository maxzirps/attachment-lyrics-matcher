import { Song } from "@/app/page";
import { Button } from "./button";
import { calculateAttachmentStyle } from "@/lib/calculate-attachment-style";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

type AttachmentStyleViewerProps = {
  songs: Song[];
};

const AttachmentStyleViewer = ({ songs }: AttachmentStyleViewerProps) => {
  const [result, setResult] = useState<number>();
  const handleClick = () => {
    setResult(calculateAttachmentStyle(songs));
  };

  return (
    <div className="py-24">
      <Button size="lg" onClick={handleClick}>
        Check results
      </Button>
      <Progress value={result} className="mt-12" />
    </div>
  );
};

export { AttachmentStyleViewer };
