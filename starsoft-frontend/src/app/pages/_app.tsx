// pages/_app.tsx
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';  // Certifique-se de que o caminho esteja correto
import ReactQueryProvider from '@/providers/ReactQueryProvider';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <Component {...pageProps} />
      </ReactQueryProvider>
    </Provider>
  );
}

export default MyApp;
