import axios from "axios";
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

export const post_article =
  (language, title, tag, description, is_public) => async (dispatch) => {
    dispatch({
      type: SET_ARTICLE_LOADING,
    });

    const body = JSON.stringify({
      language,
      title,
      tag,
      description,
      is_public,
    });

    console.log(body);

    try {
      const res = await fetch("/api/article/rest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      if (res.status === 200) {
        dispatch({
          type: POST_ARTICLE_SUCCESS,
        });
      } else {
        dispatch({
          type: POST_ARTICLE_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: POST_ARTICLE_FAIL,
      });
    }

    // await axios
    //   .post(
    //     `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/me/`,
    //     {
    //       language: language,
    //     },
    //     {
    //       headers: {
    //         Authorization: `JWT ${localStorage.getItem("access")}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     //  console.log(`user.id ${res.data.id}`);
    //     //  11
    //     dispatch({
    //       type: USER_LOADED_SUCCESS,
    //       payload: res.data,
    //     });
    //   })
    //   .catch((err) => {
    //     dispatch({
    //       type: USER_LOADED_FAIL,
    //     });
    //   });

    dispatch({
      type: REMOVE_ARTICLE_LOADING,
    });
  };
