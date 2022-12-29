function Navbar({ navItems = [] }) {
  return (
    <nav className="flex items-center pt-8 pb-4 bg-black text-white">
      <ul className="flex justify-between gap-8 w-full">
        <li className="cursor-pointer text-4xl list-none pl-14">SpaceX</li>
        {navItems.map((navItem) => (
          <li key={navItem.id} className="text-white pr-14 list-none">
            <button onClick={navItem.onClick} variant="text">
              <h6 variant="h5" fontSize={20} className="text-3xl uppercase">
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
