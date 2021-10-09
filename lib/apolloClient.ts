import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const AUTH_TOKEN_FIELD = 'Authorization';

let apolloClient: ApolloClient<Record<string, unknown>>;

function createApolloClient(token?: string) {
  const isServer = typeof window === 'undefined';

  return new ApolloClient({
    ssrMode: isServer,
    link: new HttpLink({
      uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      headers: {
        ...(Boolean(token) && { [AUTH_TOKEN_FIELD]: token })
      }
    }),
    cache: new InMemoryCache({})
  });
}

export function initializeApollo(initialState: Record<string, unknown> | null = null, token?: string) {
  const _apolloClient = apolloClient ?? createApolloClient(token);

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

export function useApollo(initialState: Record<string, unknown>, token?: string) {
  return useMemo(() => initializeApollo(initialState, token), [initialState, token]);
}
