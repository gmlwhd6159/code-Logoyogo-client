import Nav from "../components/Nav";
import LandingPart1 from "../components/LandingPart1";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Actions } from "../actions/index";
import "../scss/MainPage.scss";
import "../scss/_CommonComponents.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";

require("dotenv").config();

export default function MainPage() {
  const dispatch = useDispatch();

  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);

  const handleSignout = (): void => {
    dispatch(Actions.setUserInfo("", ""));
    dispatch(Actions.setLoginStatus(false));
    dispatch(Actions.setAccessToken(""));
  };

  return (
    <div id="container-mainpage">
      <Nav />
      <LandingPart1 />
    </div>
  );
}
