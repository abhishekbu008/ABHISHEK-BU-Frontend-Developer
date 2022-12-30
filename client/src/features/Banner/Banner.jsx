import BgVideo from "../../assets/space-bg.mp4";
import { useDispatch, useSelector } from "react-redux";
import { authDialogOpen } from "../../appSlice";

function Banner() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!user) {
      dispatch(authDialogOpen());
    }
  };

  return (
    <div
      style={{ height: "calc(100vh - 5.5rem)" }}
      className="text-white bg-black relative z-0"
    >
      <div className="absolute top-0 left-0 h-full w-full opacity-40 -z-10">
        <video autoPlay muted loop className="h-full w-full object-cover">
          <source src={BgVideo} type="video/mp4" />
          Your browser is not supported!
        </video>
      </div>
      <div className="absolute top-1/2 left-1/2 text-center -translate-y-1/2 -translate-x-1/2 -mt-12 w-full">
        <h1 className="mb-12 uppercase text-4xl md:text-6xl lg:text-8xl">
          To Universe and Beyond
        </h1>
        <h5 className="font-medium text-md mb-10 capitalize md:text-xl lg:text-2xl">
          Sending Humans and Cargo into Space
        </h5>
        <a href="#search">
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded w-fit h-fit py-2 px-5 lg:py-4 lg:px-10"
          >
            {user ? "Explore" : "Sign in to Explore"}
          </button>
        </a>
      </div>
    </div>
  );
}

export default Banner;
