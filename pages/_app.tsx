import type { AppProps } from 'next/app';
// providers
import { ThemeProvider } from 'styled-components';
// local
import { theme } from '../modules/shared/styles/styled/theme';
import { GlobalStyles } from '../modules/shared/styles/styled/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      <GlobalStyles />
    </>
  );
}
export default MyApp;
