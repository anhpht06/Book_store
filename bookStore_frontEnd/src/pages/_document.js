import { Html, Head, Main, NextScript } from "next/document";

import  IHeaderHome  from "@/component/headHome";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <IHeaderHome />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body> 
    </Html>
  );
}
  