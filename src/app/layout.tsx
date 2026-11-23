import type { Metadata } from 'next';
import './globals.css';
import { MediHogarProvider } from '@/context/MediHogarContext';

export const metadata: Metadata = {
  title: 'MediHogar | TechMed Domiciliario',
  description: 'Toma de muestras médicas a domicilio y resultados digitales',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <MediHogarProvider>{children}</MediHogarProvider>
      </body>
    </html>
  );
}