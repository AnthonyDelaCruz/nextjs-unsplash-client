import "bootstrap/dist/css/bootstrap.min.css";
import "../public/styles.css";
import { AnimatePresence } from "framer-motion";

export default function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}
