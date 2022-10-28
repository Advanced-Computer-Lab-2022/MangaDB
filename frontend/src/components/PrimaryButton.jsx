import React from 'react'

const PrimaryButton = (props) => {
  return (
    <button className={`block text-md py-2 pr-3 pl-3 text-gray-700 rounded-full md:px-3 active:text-white hover:ease-in-out duration-300 focus:ease-in-out ${props.className} `}>
        {props.text}
        
    </button>
  )
}

export default PrimaryButton;