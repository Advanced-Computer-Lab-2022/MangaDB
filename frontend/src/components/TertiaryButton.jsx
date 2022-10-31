import React from 'react'

const TertiaryButton = (props) => {
  return (
    <button onClick={props.onClick} className={`border-2 px-3 py-2 text-md text-gray-700 font-medium border-primaryBlue rounded-md border-opacity-70 focus:bg-veryLightBlue focus:border-darkBlue duration-300 focus:ease-in-out ${props.className}`}>
        {props.text}
    </button>
  )
}

export default TertiaryButton;