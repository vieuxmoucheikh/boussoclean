'use client';

import React, { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically sign out the user when this page loads
    const performSignOut = async () => {
      await signOut({ redirect: false });
      router.push('/');
    };

    performSignOut();
  }, [router]);

  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <section className="bg-blue-600 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Déconnexion</h1>
          <p className="text-xl max-w-3xl">
            Vous êtes en train d'être déconnecté de votre compte...
          </p>
        </div>
      </section>

      {/* Loading indicator */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg">Déconnexion en cours...</p>
        </div>
      </section>
    </main>
  );
}
