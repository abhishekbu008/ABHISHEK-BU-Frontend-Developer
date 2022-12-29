import BgVideo from "../../assets/space-bg.mp4";
import { useDispatch, useSelector } from "react-redux";
import { authDialogOpen } from "../../appSlice";

function Banner() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="h-screen text-white bg-black relative z-0">
      <div className="absolute top-0 left-0 h-full w-full opacity-40 -z-10">
        <video autoPlay muted loop className="h-full w-full object-cover">
          <source src={BgVideo} type="video/mp4" />
          Your browser is not supported!
        </video>
      </div>
      <div className="absolute top-1/2 left-1/2 text-center -translate-y-1/2 -translate-x-1/2 -mt-12 w-full">
        <h1 className="mb-12 text-8xl uppercase">To Universe and Beyond</h1>
        <h5 className="font-medium text-2xl mb-10 capitalize">
          Sending Humans and Cargo into Space
        </h5>
        <button
          onClick={() => dispatch(authDialogOpen())}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-10 border border-blue-700 rounded w-fit h-fit"
        >
          <a href="#search">{user ? "Explore" : "Sign in to Explore"}</a>
        </button>
      </div>
    </div>
  );
}

export default Banner;
