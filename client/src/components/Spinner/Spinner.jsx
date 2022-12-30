function Spinner({className}) {
  return (
    <div className={`bg-white w-full flex justify-center items-center ${className}`}>
      <div className="flex w-full items-center justify-center bg-white">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
          <div className="h-9 w-9 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
