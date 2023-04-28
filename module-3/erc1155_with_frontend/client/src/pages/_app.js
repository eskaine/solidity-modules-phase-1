import "@/styles/globals.css";
import WalletConnect from "@/providers/WalletConnect";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  typography: {
    button: {
      textTransform: "none",
      fontSize: 16,
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <WalletConnect>
        <Component {...pageProps} />
      </WalletConnect>
    </ThemeProvider>
  );
}
