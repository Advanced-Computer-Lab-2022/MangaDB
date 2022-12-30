import ForgotPassword from "../components/Login-SignUp/ForgotPassword";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function ForgotPasswordPage() {
  return (
    <SnackbarProvider maxSnack={3}>
      <ForgotPassword />
    </SnackbarProvider>
  );
}
