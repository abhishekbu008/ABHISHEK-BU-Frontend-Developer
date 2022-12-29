function Input({
  error,
  onChange,
  value,
  label,
  placeholder,
  type,
  className,
  ...restProps
}) {
  return (
    <div className={`${className}`} {...restProps}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? "border rounded" : ""
        }`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
      />
      {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
    </div>
  );
}

export default Input;
