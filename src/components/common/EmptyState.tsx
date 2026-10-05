import React, { ReactNode } from "react";
import { PackageOpen } from "lucide-react";
import { Button } from "../ui/Button";
import Link from "next/link";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = <PackageOpen className="w-12 h-12 text-white/30" />,
  title,
  description,
  actionText,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/60 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionText && actionHref && (
        <Link href={actionHref}>
          <Button variant="outline" size="md">
            {actionText}
          </Button>
        </Link>
      )}

      {actionText && onAction && !actionHref && (
        <Button variant="outline" size="md" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
