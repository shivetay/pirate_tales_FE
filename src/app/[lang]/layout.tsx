import type { Metadata } from 'next';
import '@/app/[lang]/styles/globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { I18nProvider, QueryProvider } from '@/providers';

export const metadata: Metadata = {
  title: 'Pirate Tales',
  description: 'Pirate Tales - An epic adventure awaits!',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body>
        <ThemeProvider>
          <I18nProvider locale={lang}>
            <QueryProvider>{children}</QueryProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
