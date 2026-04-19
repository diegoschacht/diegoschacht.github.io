import { ArrowLeft } from "lucide-react";
import HudButton from "@/features/common/components/hud-button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-32 text-center">
      <p className="mb-4 text-sm font-medium tracking-wider text-accent uppercase">
        404
      </p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mb-8 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <HudButton href="/">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </HudButton>
    </div>
  );
}
