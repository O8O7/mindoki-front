import axios from "axios";
import * as actionTypes from "./types";

export const addMessage = (message) => {
  return {
    type: actionTypes.ADD_MESSAGE,
    message: message,
  };
};

export const setMessages = (messages) => {
  return {
    type: actionTypes.SET_MESSAGES,
    messages: messages,
  };
};

const getUserChatsSuccess = (chats) => {
  return {
    type: actionTypes.GET_CHATS_SUCCESS,
    chats: chats,
  };
};

export const getUserChats = (username, token) => {
  return (dispatch) => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    // axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    };
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/chat/?username=${username}`)
      .then((res) => dispatch(getUserChatsSuccess(res.data)));
  };
};
