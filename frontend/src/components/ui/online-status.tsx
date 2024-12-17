"use client";

import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const OnlineStatus = () => {
  const pingUrl = "http://127.0.0.1:8000/ping";
  const [status, setStatus] = useState("loading");
  const [, setError] = useState<string | null>(null);

  const checkStatus = async () => {
    try {
      const response = await fetch(pingUrl);
      if (response.ok) {
        setStatus("online");
        setError(null);
      } else {
        setStatus("offline");
        setError("Failed to ping the server");
      }
    } catch (err) {
      console.log(err);
      setStatus("offline");
      setError("Failed to reach the server");
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [pingUrl]);

  return (
    <div className="flex items-center justify-center space-x-2">
      <span>Connection Status:</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <span className="relative flex h-3 w-3">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  status == "online" ? "bg-green-400" : "bg-red-400"
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  status == "online" ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{status}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export { OnlineStatus };
