"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const OnlineStatus = ({ status }: { status: string }) => {
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
