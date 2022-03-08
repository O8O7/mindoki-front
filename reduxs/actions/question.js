import {
  POST_QUESTION_SUCCESS,
  POST_QUESTION_FAIL,
  SET_QUESTION_LOADING,
  REMOVE_QUESTION_LOADING,
} from "./types";

export const post_question =
  (language, title, tag, description) => async (dispatch) => {
    dispatch({
      type: SET_QUESTION_LOADING,
    });

    console.log(tag);

    const body = JSON.stringify({
      language,
      title,
      tag,
      description,
    });
    try {
      const res = await fetch("/api/question/rest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });

      if (res.status === 200) {
        dispatch({
          type: POST_QUESTION_SUCCESS,
        });
      } else {
        dispatch({
          type: POST_QUESTION_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: POST_QUESTION_FAIL,
      });
    }

    dispatch({
      type: REMOVE_QUESTION_LOADING,
    });
  };
