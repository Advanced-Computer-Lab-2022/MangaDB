import React from 'react'

const PrimaryButton = (props) => {
  return (
    <button 
    type={props.type? props.type:'button'}
    onClick={props.onClick}
    className={`block text-md py-2 pr-3 pl-3 text-gray-700 rounded-full md:px-3 md:hover:text-primaryBlue active:hover:text-white active:text-white active:hover:text-white active:text-white hover:ease-in-out duration-300 active:ease-in-out${props.className}`}>
        {props.text}
        
    </button>
  )
}

export default PrimaryButton;