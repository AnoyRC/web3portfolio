import "@/styles/globals.css";
import { Provider, createStore } from "react-redux";
import { store } from "@/redux/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
