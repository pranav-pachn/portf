import '@/app/globals.css';
import '@/styles/animations.css';
import 'lenis/dist/lenis.css';
import { fontSans, fontDisplay, fontMono } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ScrollOrchestrator } from '@/components/layout/ScrollOrchestrator';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMenu } from '@/components/layout/FloatingMenu';
import { CommandPalette } from '@/components/ui/command-palette';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CursorSpotlight } from '@/components/motion/CursorSpotlight';
import { RouteTransition } from '@/components/motion/RouteTransition';
import IntroReveal from '@/components/transitions/IntroReveal';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn('relative', fontSans.variable, fontDisplay.variable, fontMono.variable)}>
      <head />
      <body className={cn('relative min-h-screen antialiased overflow-x-hidden font-sans', fontSans.variable, fontDisplay.variable, fontMono.variable)}>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                document.documentElement.setAttribute('data-theme', 'light');
              } catch (e) {}
            })();
          `
        }} />
        <IntroReveal />
        <ScrollOrchestrator>
          <ThemeProvider>
            <div className="relative min-h-screen">
              <div
                id="page-wrapper"
                className="flex flex-col min-h-screen origin-center"
              >
                <CursorSpotlight />
                <ScrollProgress />
                <Header />
                <main className="flex-1 flex flex-col">
                  <RouteTransition>
                    {children}
                  </RouteTransition>
                </main>
                <Footer />
                <CommandPalette />
              </div>
              <FloatingMenu />
            </div>
          </ThemeProvider>
        </ScrollOrchestrator>
      </body>
    </html>
  );
}
