import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réservation | Boussoclean',
  description: 'Réservez facilement vos services de nettoyage professionnel à Paris et en Île-de-France. Canapés, matelas, tapis et bien plus.',
};

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="reservation-layout">
      {children}
    </div>
  );
}
