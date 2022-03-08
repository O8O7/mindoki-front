import axios from "axios";
import {
  EDIT_PORTFOLIO_SUCCESS,
  EDIT_PORTFOLIO_FAIL,
  DELETE_PORTFOLIO_SUCCESS,
  DELETE_PORTFOLIO_FAIL,
  SET_PORTFOLIO_LOADING,
  REMOVE_PORTFOLIO_LOADING,
  POST_PORTFOLIO_SUCCESS,
  POST_PORTFOLIO_FAIL,
} from "./types";

import cookie from "cookie";

export const post_portfolio =
  (language, title, tag, description, images, is_public) =>
  async (dispatch) => {
    dispatch({
      type: SET_PORTFOLIO_LOADING,
    });

    let access = false;
    try {
      access = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access"))
        .split("=")[1];
    } catch (err) {
      return { message: "アクセストークンがありません" };
    }

    if (access === false) {
      return res.status(401).json({
        error: "アクセストークンがありません",
      });
    }

    const formData = new FormData();
    formData.append("language", language);

    formData.append("title", title);
    formData.append("description", description);
    for (let i = 0; i < tag.length; i++) {
      formData.append("tag", tag[i].name);
    }
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    formData.append("is_public", is_public);

    try {
      const apiRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/portfolio/`,
        {
          method: "POST",
          headers: {
            Authorization: `JWT ${access}`,
          },
          body: formData,
        }
      );
      console.log(apiRes);

      if (res.status === 201) {
        dispatch({
          type: POST_PORTFOLIO_SUCCESS,
        });
      } else {
        dispatch({
          type: POST_PORTFOLIO_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: REMOVE_PORTFOLIO_LOADING,
      });
    }

    dispatch({
      type: REMOVE_PORTFOLIO_LOADING,
    });
  };
