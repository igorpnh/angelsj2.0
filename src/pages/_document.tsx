import { Html, Head, Main, NextScript } from "next/document";
import { CSSReset, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>    
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <CSSReset />
          <Main />
          <NextScript />
      </body>
    </Html>
  );
}
