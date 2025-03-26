// pages/_app.tsx
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import {store} from '../redux/store';  // Certifique-se de que o caminho esteja correto

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
