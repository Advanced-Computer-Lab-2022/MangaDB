import React from 'react'



const SecondaryButton = (props) => {
  return (
    <button 
    type={props.type ? props.type : "button"}
    onClick={props.onClick}
    className={`block text-md py-2 pr-4 pl-3 text-white bg-primaryBlue rounded-lg md:px-3 md:text-white hover:bg-darkBlue hover:text-white hover:ease-in-out duration-300 focus:ease-in-out focus:bg-darkBlue focus:text-gray-700 active:text-gray-700 ${props.className}`}>
       {props.icon} {props.text}  {props.children} 
       
    </button>
  )
}

export default SecondaryButton;