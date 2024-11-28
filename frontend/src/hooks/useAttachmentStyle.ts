import { Song } from "@/app/page";
import { useState } from "react";

const useAttachmentStyle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const classifyAttachmentStyle = async (songs: Song[]) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/classify-attachment-style",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(songs),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to classify attachment style");
      }

      const data = await response.json();
      setResult(data.attachment_style);
    } catch (error: any) {
      setError(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    result,
    classifyAttachmentStyle,
  };
};

export default useAttachmentStyle;
