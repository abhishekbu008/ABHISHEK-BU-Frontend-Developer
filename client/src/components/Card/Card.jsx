function Card({ children, className, ...restProps }) {
  return (
    <div
      className={`h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-lg ${className}`}
      {...restProps}
    >
      {children}
    </div>
  );
}

export default Card;
