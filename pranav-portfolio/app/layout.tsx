import '@/styles/tokens.css';
import '@/styles/animations.css';
import '@/app/globals.css';
import { fontSans, fontDisplay } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/ui/command-palette';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { constructMetadata } from '@/lib/metadata';

export const metadata = constructMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen antialiased', fontSans.variable, fontDisplay.variable)}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CommandPalette />
            <ScrollToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
