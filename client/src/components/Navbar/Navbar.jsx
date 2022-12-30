function Navbar({ navItems = [] }) {
  return (
    <nav className="flex items-center pt-8 pb-4 bg-black text-white h-fit">
      <ul className="flex justify-between gap-8 w-full items-center">
        <li className="cursor-pointer text-3xl list-none pl-4 md:text-4xl md:pl-14">SpaceX</li>
        {navItems.map((navItem) => (
          <li key={navItem.id} className="text-white list-none pr-4 md:pr-14">
            <button onClick={navItem.onClick} variant="text">
              <h6 className="text-xl uppercase md:text-3xl">
                {navItem.text}
              </h6>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
