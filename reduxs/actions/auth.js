import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
} from "./types";

// export const load_user = () => async (dispatch) => {
//   dispatch({
//     type: SET_AUTH_LOADING,
//   });

//   await axios
//     .get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/me/`, {
//       headers: {
//         Authorization: `JWT ${localStorage.getItem("access")}`,
//       },
//     })
//     .then((res) => {
//       //  console.log(`user.id ${res.data.id}`);
//       //  11
//       dispatch({
//         type: USER_LOADED_SUCCESS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: USER_LOADED_FAIL,
//       });
//     });

//   dispatch({
//     type: REMOVE_AUTH_LOADING,
//   });
// };

export const checkAuthenticated = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
      });

      // ユーザー情報取得
      dispatch(user());
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      //   payload: err.response.data,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

// ユーザー情報取得

export const user = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch("/api/account/user", {
      method: "GET",
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const user_register =
  (name, email, password, re_password) => async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/`,
        {
          name: name,
          email: email,
          password: password,
          re_password: re_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.status,
        });
      })
      .catch((err) => {
        dispatch({
          type: SIGNUP_FAIL,
          payload: err.response.data,
        });
      });

    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const verify = (uid, token) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/activation/`,
      body,
      config
    );

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const reset_password = (email) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/reset_password/`,
      body,
      config
    );

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (err) {
    // console.log(err.response.data);
    dispatch({
      type: PASSWORD_RESET_FAIL,
      payload: err.response.data,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/reset_password_confirm/`,
        body,
        config
      );

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
      });
    }

    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const logout = () => async (dispatch) => {
  //   dispatch({
  //     type: LOGOUT,
  //   });
  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch("/api/account/logout", {
      method: "POST",
    });

    if (res.status === 200) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

// プロフィール編集
export const edit_profile = (name, image, introduction) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const formData = new FormData();
  if (name) {
    formData.append("name", name);
  }
  if (image) {
    formData.append("image", image);
  }
  if (introduction) {
    formData.append("introduction", introduction);
  }

  const token = localStorage.getItem("access");
  if (token) {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/me/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: EDIT_PROFILE_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: EDIT_PROFILE_FAIL,
        });
      });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const setAxiosAuthToken = (token) => {
  if (typeof token !== "undefined" && token) {
    axios.defaults.headers.common["Authorization"] = "JWT " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// リフレッシュトークン
export const refresh = () => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch("/api/account/refresh/", {
      method: "GET",
    });

    if (res.status === 200) {
      dispatch({
        type: REFRESH_SUCCESS,
      });

      dispatch(verify());
    } else {
      dispatch({
        type: REFRESH_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: REFRESH_FAIL,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};
