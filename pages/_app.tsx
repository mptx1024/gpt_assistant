import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';

import Layout from '@/components/Layout';
import { store } from '@/store';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </ThemeProvider>
    );
}
