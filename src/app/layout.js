import '@fontsource/bebas-neue/400.css';
import '@fontsource/newsreader/400.css';
import '@fontsource/newsreader/400-italic.css';
import './globals.css';

export const metadata = {
  title: 'Duarte Nunes Presents',
  description: 'Tattoos, illustrations, covers and cartoons by Duarte Nunes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
