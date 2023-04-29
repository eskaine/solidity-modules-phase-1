import "@/styles/globals.css";
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
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
