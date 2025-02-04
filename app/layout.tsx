import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { DarkModeProvider } from '@/context/darkModeContext';

export const metadata: Metadata = {
  title: 'Cash Dime',
  description: 'Accounting software',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <DarkModeProvider>
          {children}
          <Toaster
            position="top-right"
            closeButton
            richColors
            pauseWhenPageIsHidden
            toastOptions={{
              duration: 6000,
            }}
          />
        </DarkModeProvider>
      </body>
    </html>
  );
}
