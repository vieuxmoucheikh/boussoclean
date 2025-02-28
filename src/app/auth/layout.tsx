import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Authentification | Boussoclean',
    template: '%s | Boussoclean',
  },
  description: 'Connectez-vous ou créez un compte pour accéder à nos services de nettoyage',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
