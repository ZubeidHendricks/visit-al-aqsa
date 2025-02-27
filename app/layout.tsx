import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visit Al Aqsa - Crowdfunding Platform',
  description: 'Help individuals fulfill their dream of visiting Al Aqsa through our crowdfunding platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
