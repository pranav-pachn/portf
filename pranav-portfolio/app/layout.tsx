import '@/app/globals.css';
import '@/styles/animations.css';
import { fontSans, fontDisplay, fontMono } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMenu } from '@/components/layout/FloatingMenu';
import { CommandPalette } from '@/components/ui/command-palette';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CursorSpotlight } from '@/components/motion/CursorSpotlight';
import { RouteTransition } from '@/components/motion/RouteTransition';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={cn('relative', fontSans.variable, fontDisplay.variable, fontMono.variable)}>
      <head />
      <body className={cn('relative min-h-screen antialiased overflow-x-hidden font-sans', fontSans.variable, fontDisplay.variable, fontMono.variable)}>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                document.documentElement.setAttribute('data-theme', 'dark');
              } catch (e) {}
            })();
          `
        }} />
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            {/* Global Noise Layer */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.015] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
            
            <CursorSpotlight />
            <ScrollProgress />
            <Header />
            <FloatingMenu />
            <main className="flex-1 flex flex-col">
              <RouteTransition>
                {children}
              </RouteTransition>
            </main>
            <Footer />
            <CommandPalette />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
