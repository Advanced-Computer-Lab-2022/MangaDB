import React from 'react';
import SecondaryButton from '../SecondaryButton';
import reactImage from '../../Assets/Images/react.png'

const AddToCartCard = (props) => {
    return (
        <div className="md:w-4/12 mx-4 md:mx-0 p-4 shadow-lg bg-white rounded-lg space-y-2 md:absolute md:right-4 md:top-60">
            <img src={reactImage} alt="" />
            <SecondaryButton text="Add To Cart" className="w-full"/>
        </div>
    );
};

export default AddToCartCard;