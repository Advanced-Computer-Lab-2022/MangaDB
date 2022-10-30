import AddUserForm from "../components/AddUserForm";
import NavBar from "../components/NavBar";

export default function AdminAddNewUser() {
/*
const onSubmitHandler=(e)=>{
e.preventDefault();
console.log("Submitted");
console.log(e.target[4].value);
}

const toggleonChangeHandler=(e)=>{
console.log(e.target.value);

}
*/

  return (
    <div>
      <NavBar />
      {/*<AddUserForm onSubmit={onSubmitHandler} toggleOnChange={toggleonChangeHandler}/>*/}
      <AddUserForm />
    </div>
  );
}
