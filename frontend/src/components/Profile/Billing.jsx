import { Fragment, useState } from "react";
import SecondaryButton from "../SecondaryButton";
import { Disclosure } from "@headlessui/react";
import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  StarIcon,
} from "@heroicons/react/outline";

const subNavigation = [
  { name: "Profile", icon: UserCircleIcon, current: false },
  { name: "Billing", icon: CreditCardIcon, current: true },
  { name: "Security & Privacy", icon: KeyIcon, current: false },
  { name: "Reviews & Ratings", icon: StarIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Billing = (props) => {
  const defaultCardNumber = props.cardNumber ? props.cardNumber : "";
  const defaultNameOnCard = props.biography ? props.biography : "";
  const defaultExpirationDate = props.expirationDate
    ? props.expirationDate
    : "";
  const defaultCvc = props.cvc ? props.cvc : "";

  const [cardNumber, setCardNumber] = useState(defaultCardNumber);
  const [nameOnCard, setNameOnCard] = useState(defaultNameOnCard);
  const [expirationDate, setExpirationDate] = useState(defaultExpirationDate);
  const [cvc, setCvc] = useState(defaultCvc);

  const CardNumberChangeHandler = (event) => {
    setCardNumber(event.target.value);
  };

  const nameOnCardChangeHandler = (event) => {
    setNameOnCard(event.target.value);
  };
  const expirationDateChangeHandler = (event) => {
    setExpirationDate(event.target.value);
  };

  const cvcChangeHandler = (event) => {
    setCvc(event.target.value);
  };

  const onSaveHandler = (event) => {
    event.preventDefault();
    const saveData = {
      cardNumber: cardNumber,
      nameOnCard: nameOnCard,
      expirationDate: expirationDate,
      cvc: cvc,
    };

    props.onSaveHandler(saveData);
  };
  return (
    <div>
      <Disclosure
        as="div"
        className="relative bg-sky-700 pb-32 overflow-hidden"
      >
        {({ open }) => (
          <Fragment>
            <div
              aria-hidden="true"
              className={classNames(
                open ? "bottom-0" : "inset-y-0",
                "absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0"
              )}
            >
              <div className="absolute inset-0 flex">
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: "#0a527b" }}
                />
                <div
                  className="h-full w-1/2"
                  style={{ backgroundColor: "#065d8c" }}
                />
              </div>
              <div className="relative flex justify-center">
                <svg
                  className="flex-shrink-0"
                  width={1750}
                  height={308}
                  viewBox="0 0 1750 308"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
                    fill="#0369a1"
                  />
                  <path
                    d="M1465.84 308L16.816 0H1750v308h-284.16z"
                    fill="#065d8c"
                  />
                  <path
                    d="M1733.19 0L284.161 308H0V0h1733.19z"
                    fill="#0a527b"
                  />
                  <path
                    d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
                    fill="#0a4f76"
                  />
                </svg>
              </div>
            </div>
            <header className="relative py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
              </div>
            </header>
          </Fragment>
        )}
      </Disclosure>

      <main className="relative -mt-32">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <div className="space-y-1">
                  {subNavigation.map((item) => (
                    <div
                      key={item.name}
                      onClick={props.changeStageHandler.bind(null, item.name)}
                      className={classNames(
                        item.current
                          ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                          : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                        "group border-l-4 px-3 py-2 flex items-center text-sm font-medium cursor-pointer"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-teal-500 group-hover:text-teal-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                  ))}
                </div>
              </aside>

              <form
                className="divide-y divide-gray-200 lg:col-span-9"
                onSubmit={onSaveHandler}
              >
                <div className="py-6 px-4 sm:p-6 lg:pb-8">
                  <div>
                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-1">
                      Billing Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      This information is related to your credit card
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col lg:flex-row">
                    <div className="flex-grow space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Card Number
                        </label>
                        <div className="mt-1 rounded-md shadow-sm flex">
                          <input
                            value={cardNumber}
                            onChange={CardNumberChangeHandler}
                            type="text"
                            name="email"
                            id="email"
                            autoComplete="username"
                            className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded rounded-r-md sm:text-sm border-gray-300"
                          />
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name On Card
                        </label>
                        <input
                          value={nameOnCard}
                          onChange={nameOnCardChangeHandler}
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="focus:ring-sky-500  focus:border-sky-500 flex-grow block w-full min-w-0 rounded rounded-r-md sm:text-sm border-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiration Date
                      </label>
                      <input
                        placeholder="MM/YY"
                        onChange={expirationDateChangeHandler}
                        value={expirationDate}
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVC
                      </label>
                      <input
                        value={cvc}
                        onChange={cvcChangeHandler}
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 py-4 px-4 flex justify-end sm:px-6 bg-gray-100">
                  <SecondaryButton type="submit">Save</SecondaryButton>
                </div>
                {/* Billing history */}
                <section aria-labelledby="billing-history-heading">
                  <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 sm:px-6">
                      <h2
                        id="billing-history-heading"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Billing history
                      </h2>
                    </div>
                    <div className="mt-6 flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="overflow-hidden border-t border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Description
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Amount
                                  </th>
                                  <th
                                    scope="col"
                                    className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    <span className="sr-only">
                                      View receipt
                                    </span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {props.payments.map((payment) => (
                                  <tr key={payment.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      <time dateTime={payment.datetime}>
                                        {payment.date}
                                      </time>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {payment.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {payment.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <a
                                        href={payment.href}
                                        className="text-blue-700 hover:text-blue-900"
                                      >
                                        View receipt
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Billing;
