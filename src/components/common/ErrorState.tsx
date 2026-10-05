import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the requested information. Please check your connection and try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-brand-orange" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/60 max-w-sm mb-6 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RotateCcw className="w-3.5 h-3.5 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}
