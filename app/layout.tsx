import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/providers/modal-provider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Board | Visual Workspace",
  description:
    "An incredibly fast, realtime online whiteboard for modern teams to collaborate, brainstorm, and design together in a virtual space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased selection:bg-blue-500/30`}
      >
        <Suspense
          fallback={
            <div className="h-screen w-screen flex items-center justify-center bg-background">
              <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground font-medium animate-pulse">
                  Loading workspace...
                </p>
              </div>
            </div>
          }
        >
          <ConvexClientProvider>
            <Toaster
              position="bottom-center"
              toastOptions={{
                classNames: {
                  toast:
                    "!bg-white dark:!bg-zinc-900 border !border-slate-200 dark:!border-zinc-800 shadow-xl !rounded-2xl text-slate-900 dark:text-zinc-100 p-4",
                  title: "!font-semibold !text-sm",
                  description: "!text-slate-500 dark:!text-zinc-400 !text-sm",
                  actionButton:
                    "!bg-blue-600 !text-white !rounded-lg font-medium",
                  cancelButton:
                    "!bg-slate-100 dark:!bg-zinc-800 !text-slate-900 dark:!text-zinc-100 !rounded-lg font-medium",
                },
              }}
            />
            <ModalProvider />
            {children}
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
