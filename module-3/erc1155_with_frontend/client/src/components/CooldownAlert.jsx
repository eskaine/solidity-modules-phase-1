import { Alert, Snackbar } from "@mui/material";

export default function CooldownAlert({ cooldown, isAlert, alertCallback }) {
  console.log({ cooldown, isAlert, alertCallback });
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isAlert}
      autoHideDuration={3000}
      onClose={alertCallback}
    >
      <Alert severity="warning">You may only mint after {(cooldown /1000)} seconds!</Alert>
    </Snackbar>
  );
}
