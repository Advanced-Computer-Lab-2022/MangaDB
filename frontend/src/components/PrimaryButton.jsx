import React from 'react'

const PrimaryButton = (props) => {
  return (
    <button className={`block text-md py-2 pr-3 pl-3 text-gray-700 rounded-full md:px-3 md:hover:text-primaryBlue focus:bg-primaryBlue focus:text-white active:hover:text-white active:text-white ${props.className}`}>
        {props.text}
        
    </button>
  )
}

export default PrimaryButton;