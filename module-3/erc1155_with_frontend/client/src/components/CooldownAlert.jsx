import { Alert, Snackbar } from "@mui/material";

export default function CooldownAlert({ cooldown, isAlert }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isAlert}
    >
      <Alert severity="warning">You may only mint after {(cooldown / 1000)} seconds!</Alert>
    </Snackbar>
  );
}
