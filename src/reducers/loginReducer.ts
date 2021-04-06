import { ACTIONS } from "../actions/index";
import { initialState } from "./initialState";

interface Action {
  type: string;
  payload: any;
}

const loginReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_LOGINSTATUS: {
      return Object.assign({}, state, {
        isLogin: !state.isLogin,
      });
    }

    default:
      return state;
  }
};

export default loginReducer;