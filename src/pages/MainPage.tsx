import Nav from "../components/Nav";
import LandingPart1 from "../components/LandingPart1";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Actions } from "../actions/index";
import "../scss/MainPage.scss";
import "../scss/_CommonComponents.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import axios from "axios";

require("dotenv").config();

export default function MainPage() {
  const dispatch = useDispatch();
  const [logoname, setLogoName] = useState<string>("");

  const handleLogoName = (event) => {
    setLogoName(event.target.value);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
  });

  async function getAccessToken(authorizationCode) {
    await axios
      .post("http://localhost:5000/callback", {
        authorizationCode: authorizationCode,
      })
      .then((data) => {
        let token = data.data.accessToken;
        dispatch(Actions.setAccessToken(token));
        dispatch(Actions.setLoginStatus(true));
        getuserinfo(token);
      });
  }

  async function getuserinfo(token) {
    await axios
      .get("https://api.github.com/user", {
        headers: {
          authorization: `token ${token}`,
        },
      })
      .then((data) => {
        const { email, login } = data.data;
        let username = login;
        dispatch(Actions.setUserInfo(username, email));
      });
  }

  return (
    <div id="container-mainpage">
      <Nav />
      <LandingPart1 handleLogoName={handleLogoName} />
    </div>
  );
}
