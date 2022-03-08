import {
  POST_ARTICLE_SUCCESS,
  POST_ARTICLE_FAIL,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_FAIL,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAIL,
  SET_ARTICLE_LOADING,
  REMOVE_ARTICLE_LOADING,
} from "./types";

const initialState = {
  //   access: null,
  //   refresh: null,
  //   isAuthenticated: null,
  //   user: null,

  loading: false,
  status_code: null,
  message: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ARTICLE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_ARTICLE_LOADING:
      return {
        ...state,
        loading: false,
      };
  }
}
