export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const UpdateUser = (user) => ({
  type: "UPDATE_USER",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const LogOut = () => ({
  type: "LOGOUT",
});
