const Card = props => {
  const className = props.className;
  return (
  <div className={`drop-shadow-lg ${className} rounded-md bg-white`}>
    {props.children}
  </div>
  )
};

export default Card;