import MobileShell from "@/components/MobileShell";
import { AppStateProvider } from "@/components/AppState";

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col py-4 sm:py-6">
      <AppStateProvider>
        <MobileShell />
      </AppStateProvider>
    </main>
  );
}
