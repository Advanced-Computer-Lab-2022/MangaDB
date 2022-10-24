

const NavBar = () => {
    return(
        
<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded shadow-md">
  <div className="container flex flex-wrap justify-between items-center mx-auto">
  <a href="https://flowbite.com/" className="flex items-center">
      <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo"/>
      <span className="self-center text-xl font-semibold whitespace-nowrap :text-white">MangaDB</span>
  </a>
  <div className="flex items-center md:order-2">
      <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 :focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
      </button>
      
      <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow :bg-gray-700 :divide-gray-600" id="user-dropdown" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" style={{position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate3d(0px, 15283.2px, 0px)'}}>
        <div className="py-3 px-4">
          <span className="block text-sm text-gray-900 :text-white">Bonnie Green</span>
          <span className="block text-sm font-medium text-gray-500 truncate :text-gray-400">name@flowbite.com</span>
        </div>
        <ul className="py-1" aria-labelledby="user-menu-button">
          <li>
            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 :hover:bg-gray-600 :text-gray-200 :hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 :hover:bg-gray-600 :text-gray-200 :hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 :hover:bg-gray-600 :text-gray-200 :hover:text-white">Earnings</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 :hover:bg-gray-600 :text-gray-200 :hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
      <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-400 :hover:bg-gray-700 :focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
    </button>
  </div>
  <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white :bg-gray-800 md::bg-gray-900 :border-gray-700">
      <li>
        <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 :text-white" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#74A0D1] md:p-0 :text-gray-400 md::hover:text-white :hover:bg-gray-700 :hover:text-white md::hover:bg-transparent :border-gray-700">About</a>
      </li>
      <li>
        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 :text-gray-400 md::hover:text-white :hover:bg-gray-700 :hover:text-white md::hover:bg-transparent :border-gray-700">Services</a>
      </li>
      <li>
        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 :text-gray-400 md::hover:text-white :hover:bg-gray-700 :hover:text-white md::hover:bg-transparent :border-gray-700">Pricing</a>
      </li>
      <li>
        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 :text-gray-400 md::hover:text-white :hover:bg-gray-700 :hover:text-white md::hover:bg-transparent :border-gray-700">Contact</a>
      </li>
    </ul>
  </div>
  </div>
</nav>



    );
}
export default NavBar;