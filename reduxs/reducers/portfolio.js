import { SET_PORTFOLIO_LOADING, REMOVE_PORTFOLIO_LOADING } from "./types";

const initialState = {
  loading: false,
  status_code: null,
  message: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PORTFOLIO_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_PORTFOLIO_LOADING:
      return {
        ...state,
        loading: false,
      };
  }
}
