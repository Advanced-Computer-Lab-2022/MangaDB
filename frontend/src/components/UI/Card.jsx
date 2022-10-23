import classes from './Card.module.css';

const Card = props => {
  return (
  <div className="drop-shadow-lg rounded-md max-w-xs bg-white">
    {props.children}
  </div>
  )
};

export default Card;