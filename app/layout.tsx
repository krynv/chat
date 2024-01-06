import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { ModalProvider } from '@/components/providers/modal-provider';
import { SocketProvider } from '@/components/providers/socket-provider';
import { QueryProvider } from '@/components/providers/query-provider';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chat',
  description: 'The spiritual successor of flix.chat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          font.className,
          'bg-white dark:bg-[#313338]'
        )}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            storageKey='discord-theme'>
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>
                {children}
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
