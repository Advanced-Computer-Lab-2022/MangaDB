import AddUserForm from "../components/AddUser/AddUserForm";
import { SnackbarProvider } from "notistack";

export default function AdminAddNewUser() {
  return (
    <SnackbarProvider maxSnack={3}>
    <div className="flex justify-center items-center">
      <AddUserForm />
    </div>
    </SnackbarProvider>
  );
}
