import SecondaryButton from "../UI/SecondaryButton";

export default function Contract(props) {
  return (
    <div class="">
      <div class="antialiased ">
        <div class=" mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
          <h1 className="font-bold flex justify-center">CONTRACT</h1>
          <div className="flex flex-col justify-start mt-5">
            <ul className="list-disc list-inside whitespace-nowrap ">
              <li className="py-2 bg-slate-100 p-5 rounded-lg">
                By using this website, you agree to the terms and conditions of
                this contract.
              </li>
              <li className="py-2 my-2 bg-slate-100 p-5 rounded-lg">
                By using this website, you agree to the terms and conditions of
                this contract.
              </li>
              <li className="py-2 my-2 bg-slate-100 p-5 rounded-lg">
                By using this website, you agree to the terms and conditions of
                this contract.
              </li>
              <li className="py-2 my-2 bg-slate-100 p-5 rounded-lg">
                By using this website, you agree to the terms and conditions of
                this contract.
              </li>
              <li className="py-2 my-2 bg-slate-100 p-5 rounded-lg">
                By using this website, you agree to the terms and conditions of
                this contract.
              </li>
              <li className="py-2 my-2 bg-slate-100 p-5 rounded-lg">
                By using this website, you agree to the terms and conditions of
                this contract.
              </li>
              <li className="py-2 my-2 bg-slate-100 p-5 rounded-lg">
                By using this website, you agree to the terms and conditions of
                this contract.
              </li>
              <li className="py-2 my-2 bg-slate-100 p-5 rounded-lg">
                By using this website, you agree to the terms and conditions of
                this contract.
              </li>
              <li className="py-2 my-2 bg-slate-100 p-5 rounded-lg">
                By using this website, you agree to the terms and conditions of
                this contract.
              </li>
              <li className="py-2 my-2 bg-slate-100 p-5 rounded-lg">
                By using this website, you agree to the terms and conditions of
                this contract.
              </li>
            </ul>
            <SecondaryButton
              text="Accept Contract "
              className="w-full mt-3"
              onClick={props.acceptContract}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
