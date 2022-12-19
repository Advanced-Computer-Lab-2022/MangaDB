function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ToolbarTabs = (props) => {
  const tabs = [
    { name: "Notes", current: props.currentTab === "Notes" ? true : false },
    {
      name: "Download Notes",
      current: props.currentTab === "Download Notes" ? true : false,
    },
    { name: "Q&A", current: props.currentTab === "Q&A" ? true : false },
    { name: "Reviews", current: props.currentTab === "Reviews" ? true : false },
  ];
  const onClickHandler = (event) => {
    if (event.target.innerHTML === "Notes") {
      props.onTabChangeHandler("Notes");
    } else if (event.target.innerHTML === "Download Notes") {
      props.onTabChangeHandler("Download Notes");
    } else if (event.target.innerHTML === "Q&amp;A") {
      props.onTabChangeHandler("Q&A");
    } else {
      props.onTabChangeHandler("Reviews");
    }
  };

  return (
    <div className="ml-4">
      <div className="sm:hidden">
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primaryBlue focus:border-primaryBlue sm:text-sm rounded-md"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <label
                key={tab.name}
                onClick={onClickHandler}
                className={classNames(
                  tab.current
                    ? "border-primaryBlue text-primaryBlue"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm "
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </label>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
export default ToolbarTabs;
