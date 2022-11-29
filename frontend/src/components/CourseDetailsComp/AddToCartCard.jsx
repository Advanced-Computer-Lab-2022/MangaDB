import React from 'react';
import SecondaryButton from '../SecondaryButton';
import reactImage from '../../Assets/Images/react.png'

const AddToCartCard = (props) => {
    return (
        <div className="w-4/12 p-4 shadow-lg bg-white rounded-lg space-y-2 md:absolute right-4">
            <img src={reactImage} />
            <SecondaryButton text="Add To Cart" className="w-full"/>
        </div>
    );
};

export default AddToCartCard;