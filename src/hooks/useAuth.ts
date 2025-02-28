import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type UseAuthOptions = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

/**
 * Hook to handle authentication status and redirects
 * @param options Configuration options
 * @param options.redirectTo Path to redirect to if not authenticated (default: /auth/signin)
 * @param options.redirectIfFound If true, redirect if the user is found (default: false)
 * @returns The NextAuth session and status
 */
export function useAuth({
  redirectTo = '/auth/signin',
  redirectIfFound = false,
}: UseAuthOptions = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const isUnauthenticated = status === 'unauthenticated';

  useEffect(() => {
    // Do nothing while loading
    if (isLoading) return;

    // If redirectIfFound is set and user is authenticated, redirect to the specified path
    if (redirectIfFound && isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // If redirectIfFound is not set and user is not authenticated, redirect to the specified path
    if (!redirectIfFound && isUnauthenticated) {
      router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(window.location.href)}`);
      return;
    }
  }, [isLoading, isAuthenticated, isUnauthenticated, redirectIfFound, redirectTo, router]);

  return { session, status, isLoading, isAuthenticated, isUnauthenticated };
}
