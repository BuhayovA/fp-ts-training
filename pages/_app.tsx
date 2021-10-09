import * as React from 'react';
import { Router } from 'next/router';
// libs
import NProgress from 'nprogress';
import { Toaster } from 'react-hot-toast';
// components
import Head from 'next/head';
// providers
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
// hooks
import { useApollo } from '../lib/apolloClient';
// types
import { AppProps } from 'next/app';
// local
import { theme } from '@md-styles/styled/theme';
import { GlobalStyles } from '@md-styles/styled/global';
// global css
import 'nprogress/nprogress.css';
import 'normalize.css/normalize.css';

NProgress.configure({ showSpinner: false, speed: 500 });
Router.events.on('routeChangeError', () => NProgress.done());
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <title>FP Examples</title>
        <link rel='icon' href='/static/images/knowledge-black.png' />
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
        <meta charSet='utf-8' />
      </Head>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
          <Toaster />
        </ApolloProvider>
      </ThemeProvider>
      <GlobalStyles />
    </>
  );
};

export default MyApp;
