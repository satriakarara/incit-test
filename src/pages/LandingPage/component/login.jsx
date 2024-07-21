import React, { useState } from "react";
import googleLogo from "../../../assets/google_logo.png";
import facebookLogo from "../../../assets/facebook_logo.png";
import { useGoogleLogin } from "@react-oauth/google";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function login({ setIndex }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginGoogle = useGoogleLogin({
    onSuccess: (a) => oauthCheck(a.access_token),
  });

  const loginFacebook = () => {
    alert(
      "I didn't get to finish this feature, meta developer doesn't send me sms to verify my account so i cant develop this feature :("
    );
  };

  const oauthCheck = (access_token) => {
    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(function (response) {
        axios
          .post(import.meta.env.VITE_API_URL + "/oauth", {
            user: response.data,
          })
          .then(function (response) {
            Cookies.set("loginInfo", JSON.stringify(response.data), {
              expires: 7,
            });
            navigate("/dashboard");
          })
          .catch(function (error) {
            alert("failed to login, try again later");
          });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const login = () => {
    axios
      .post(import.meta.env.VITE_API_URL + "/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        Cookies.set("loginInfo", JSON.stringify(response.data), { expires: 7 });
        navigate("/dashboard");
      })
      .catch(function (error) {
        if (error.response?.status == 401) {
          alert(error.response?.data);
        }
      });
  };

  return (
    <>
      <div id="inputs" className="flex flex-col gap-4 my-5">
        <TextField
          className="w-full"
          id="id-inic"
          label="E-Mail"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="w-full"
          id="outlined-password-input"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div id="buttons" className="flex gap-4">
        <button
          onClick={() => login()}
          className="text-white px-12 py-1 bg-purple-500 rounded-sm"
        >
          Login
        </button>
        <button
          onClick={() => setIndex(1)}
          className="text-purple-500 border border-solid border-purple-500 px-12 py-1 rounded-sm"
        >
          Sign Up
        </button>
      </div>
      <div className="mt-2">
        <p>Login with Others</p>
        <div className="flex gap-3">
          <img
            src={googleLogo}
            className="w-9 h-9 grayscale hover:grayscale-0 border rounded-full hover:border-none transition cursor-pointer"
            onClick={() => loginGoogle()}
            alt="Incit logo"
          />
          <img
            src={facebookLogo}
            className="w-9 h-9 grayscale hover:grayscale-0 border rounded-full hover:border-none transition cursor-pointer"
            alt="Incit logo"
            onClick={() => loginFacebook()}
          />
        </div>
      </div>
    </>
  );
}
