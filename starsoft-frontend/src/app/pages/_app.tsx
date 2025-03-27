import ReactQueryProvider from "@/providers/ReactQueryProvider";

function MyApp({ Component, pageProps }: any) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
    </ReactQueryProvider>
  );
}

export default MyApp;
