import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from 'next';

// 이 메타데이터는 이 레이아웃을 사용하는 모든 페이지에서 상속된다.
export const metadata: Metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
