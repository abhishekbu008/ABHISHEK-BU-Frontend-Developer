import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Spinner } from "../../components";
import { constants } from "../../constants";
import { setError, signin } from "./authenticationSlice";

export default function Authenticate() {
  const [title, setTitle] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const passwordError = errors.find((e) => e.field === "password") || null;
  const emailError = errors.find((e) => e.field === "email") || null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const type = title.split(" ").join("_").toUpperCase();
    const errors = [];
    if (!email) {
      errors.push(constants.ERRORS.EMAIL);
    }
    if (!password) {
      errors.push(constants.ERRORS.PASSWORD_REQUIRED);
    }

    if (errors.length) {
      dispatch(setError(errors));
    } else {
      dispatch(
        signin({
          email: email,
          password: password,
          type: type,
        })
      );
    }
  };

  const handleEmailChange = (value) => {
    if (!value.match(constants.EMAIL_REGEX)) {
      const errors = [constants.ERRORS.EMAIL];
      if (passwordError) {
        errors.push(passwordError);
      }
      dispatch(setError(errors));
    } else {
      const errors = [];
      if (passwordError) {
        errors.push(passwordError);
      }
      dispatch(setError(errors));
    }
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    if (value.length < 4) {
      const errors = [constants.ERRORS.PASSWORD_VALID];
      if (emailError) {
        errors.push(emailError);
      }
      dispatch(setError(errors));
    } else {
      const errors = [];
      if (emailError) {
        errors.push(emailError);
      }
      dispatch(setError(errors));
    }
    setPassword(value);
  };

  const nextTitle = (currentTitle) =>
    currentTitle === "Sign In" ? "Sign Up" : "Sign In";

  return (
    <div className="w-full">
      <h2 className="text-2xl font-boldtracking-wide text-black text-center p-2">
        {title}
      </h2>
      <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <Input
          label="Email"
          placeholder="Email"
          value={email}
          type="text"
          onChange={handleEmailChange}
          error={emailError}
          className="mb-4"
        />

        <Input
          label="Password"
          placeholder="********"
          value={password}
          type="password"
          error={passwordError}
          onChange={handlePasswordChange}
          className="mb-6 "
        />

        {errors.length !== 0 &&
          !passwordError &&
          !emailError &&
          errors.map((e) => (
            <p
              key={e.message}
              className="text-red-500 text-xs italic mb-4 text-center"
            >
              {e.message}
            </p>
          ))}

        <div className="flex items-center justify-between">
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={(e) => {
              e.preventDefault();
              setTitle(nextTitle(title));
            }}
          >
            {`Switch to ${nextTitle(title)}`}
          </button>
          {!loading ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:cursor-not-allowed"
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {title}
            </button>
          ) : (
            <Spinner className="ml-auto w-14"/>
          )}
        </div>
      </form>
    </div>
  );
}
