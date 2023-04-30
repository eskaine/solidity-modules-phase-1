import React from "react";
import { MetaMaskProvider } from "metamask-react";
import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { defaultStyle } from "@/styles/styles";

const defaultTheme = createTheme(defaultStyle);

export default function App({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <MetaMaskProvider>
        <ThemeProvider theme={defaultTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </MetaMaskProvider>
    </React.StrictMode>
  );
}
