import React from 'react'

const PrimaryButton = (props) => {
  return (
    <button 
    type={props.type? props.type:'button'}
    onClick={props.onClick}
    className={`block text-md text-gray-700 md:hover:text-primaryBlue active:hover:text-white active:text-white hover:ease-in-out duration-300 active:ease-in-out ${props.className}`}>
        {props.text}
        {props.children}
    </button>
  )
}

export default PrimaryButton;