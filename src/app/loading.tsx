import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <Spinner size="lg" />
      <span className="text-xs uppercase font-bold tracking-widest text-white/50 animate-pulse">
        Loading RizqHub...
      </span>
    </div>
  );
}
