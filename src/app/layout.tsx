import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'OmniText - Universal Text Utility Suite',
    template: '%s | OmniText',
  },
  description: 'A comprehensive suite of free online text utilities: case converter, word counter, text reverser, whitespace remover, duplicate line remover, text diff tool, and encoder/decoder. Boost your productivity with OmniText.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", inter.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
