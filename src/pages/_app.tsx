import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';

import theme from '../theme/theme';
import Layout from '@/components/Layout';


export default function App({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>

  ) 
}
