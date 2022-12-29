const constants = {
  AXIOS_SPACEX: {
    BASE_URL: "https://api.spacexdata.com/v3",
    CAPSULES: "/capsules",
    ROCKETS: "/rockets",
  },
  AUTH: {
    BASE_URL: "http://localhost:3001/api/users/",
    SIGN_UP: "/signup",
    SIGN_IN: "/signin",
  },
  CAPSULES: {
    TOTAL_ITEMS: 18,
    LIMIT: 8,
  },
  ERRORS: {
    EMAIL: { message: "Email must be valid", field: "email" },
    PASSWORD_REQUIRED: { message: "Password must be valid", field: "password" },
    PASSWORD_VALID: { message: "Password must be between 4 and 20 characters" },
  },
  EMAIL_REGEX:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export default constants;
