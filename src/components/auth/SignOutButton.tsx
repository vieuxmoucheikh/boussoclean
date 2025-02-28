'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SignOutButtonProps {
  variant?: 'primary' | 'secondary' | 'text';
  className?: string;
  redirectTo?: string;
}

export default function SignOutButton({
  variant = 'primary',
  className = '',
  redirectTo = '/',
}: SignOutButtonProps) {
  const router = useRouter();
  
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(redirectTo);
  };
  
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border border-transparent',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm',
    text: 'text-blue-600 hover:text-blue-800 hover:underline',
  };
  
  return (
    <button
      onClick={handleSignOut}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      Se déconnecter
    </button>
  );
}
