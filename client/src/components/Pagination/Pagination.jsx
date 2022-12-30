function Pagination({
  page = 1,
  count = 5,
  onChange = () => {},
  ...restProps
}) {
  const pageNumbers = [];
  for (let i = 1; i <= count; i++) {
    let className =
      "h-10 px-5 transition-colors duration-150 focus:shadow-outline ";
    if (page === i) {
      className += "bg-indigo-600 text-white";
    } else {
      className += "bg-white hover:bg-indigo-100";
    }
    pageNumbers.push(
      <li key={i}>
        <button className={className} onClick={() => onChange(i)}>
          {i}
        </button>
      </li>
    );
  }

  const Button = ({ children, onClick, className = "", disabled }) => {
    const disabledClass = disabled ? "disabled:opacity-50" : "";
    return (
      <li>
        <button
          disabled={disabled}
          onClick={onClick}
          className={`h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100 ${disabledClass} ${className}`}
        >
          {children}
        </button>
      </li>
    );
  };

  return (
    <nav {...restProps}>
      <ul className="inline-flex">
        <Button
          disabled={page === 1}
          onClick={() => onChange(page - 1 < 1 ? 1 : page - 1)}
        >
          Prev
        </Button>
        {pageNumbers}
        <Button
          disabled={page === count}
          onClick={() => onChange(page + 1 > count ? count : page + 1)}
        >
          Next
        </Button>
      </ul>
    </nav>
  );
}

export default Pagination;
