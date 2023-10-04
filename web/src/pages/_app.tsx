import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  ThemeContextProvider,
  ToastArea,
  ToastsProvider,
} from "nextjs-components";
import "nextjs-components/src/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
