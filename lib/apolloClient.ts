import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const API_PREFIX = '/api/graphql';

let apolloClient: ApolloClient<Record<string, unknown>>;

function createApolloClient() {
  const isServer = typeof window === 'undefined';

  return new ApolloClient({
    ssrMode: isServer,
    link: new HttpLink({
      uri: isServer ? process.env.NEXT_PUBLIC_GQL_REMOTE_API_URL : API_PREFIX, // Server URL (must be absolute)
      credentials: 'same-origin' // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache({})
  });
}

export function initializeApollo(initialState: Record<string, unknown> | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: Record<string, unknown>) {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}
