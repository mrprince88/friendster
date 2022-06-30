import axios from "axios";

export const LoginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });

  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    localStorage.setItem("user", JSON.stringify(res.data));
  } catch (err) {
    console.log("Error", err);
    alert("Some error occured");
    dispatch({ type: "LOGIN_FAILURE" });
  }
};

export const LogOut = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.clear();
  window.location.href("/");
};
