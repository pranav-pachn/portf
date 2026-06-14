import '@/app/globals.css';
import '@/styles/animations.css';
import { fontSans, fontDisplay } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingMenu } from '@/components/layout/FloatingMenu';
import { CommandPalette } from '@/components/ui/command-palette';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { RouteTransition } from '@/components/motion/RouteTransition';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className="relative">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var t = localStorage.getItem('theme');
                var d = t === 'light' ? 'light' : 
                        t === 'dark' ? 'dark' :
                        window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', d);
              } catch (e) {}
            })();
          `
        }} />
      </head>
      <body className={cn('relative min-h-screen antialiased', fontSans.variable, fontDisplay.variable)}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
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
            <ScrollToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
