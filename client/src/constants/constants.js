const constants = {
  AXIOS_SPACEX: {
    BASE_URL: "http://localhost:3001/api/spacex/query",
    CAPSULES: "",
    ROCKETS: "/rockets",
  },
  AUTH: {
    BASE_URL: "http://localhost:3001/api/users/",
    SIGN_UP: "/signup",
    SIGN_IN: "/signin",
  },
  CAPSULES: {
    TOTAL_ITEMS: 18,
    LIMIT: 6,
  },
  ERRORS: {
    EMAIL: { message: "Email must be valid", field: "email" },
    PASSWORD_REQUIRED: { message: "Password must be valid", field: "password" },
    PASSWORD_VALID: { message: "Password must be between 4 and 20 characters" },
    INVALID_CREDENTIALS: { message: "Invalid Credentials" },
    GENERIC: { message: "Something went wrong, Please try again" },
  },
  EMAIL_REGEX:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  CAPSULE_OPTIONS: [
    { text: "Capsule Serial", value: "capsule_serial", selected: false },
    { text: "Capsule Id", value: "capsule_id", selected: false },
    { text: "Status", value: "status", selected: false },
    { text: "Original Launch", value: "original_launch", selected: false },
    { text: "Missions", value: "mission", selected: false },
    { text: "Landings", value: "landings", selected: false },
    { text: "Type", value: "type", selected: false },
    { text: "Reuse Count", value: "reuse_count", selected: false },
  ],
};

export default constants;
