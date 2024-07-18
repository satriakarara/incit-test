import { useState, useEffect } from "react";
import incitLogo from "../../assets/incit_logo.png";
// import incitLogo from "./assets/incit_logo.png";
import googleLogo from "../../assets/google_logo.png";
import facebookLogo from "../../assets/facebook_logo.png";
import TextField from "@mui/material/TextField";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function index() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [passwordInputError, setPasswordInputError] = useState({
    lower: true,
    upper: true,
    digit: true,
    special: true,
    length: true,
  });
  const [passwordDontMatch, setPasswordDontMatch] = useState(false);

  useEffect(() => {
    if (password && repassword) {
      if (password != repassword) {
        setPasswordDontMatch(true);
      } else {
        setPasswordDontMatch(false);
      }
    }
  }, [password, repassword]);

  const passwordChange = (value) => {
    setPassword(value);
    // const lowerValidator =
    //   /^(?=.*[a-z]) (?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const lowerValidator = /^(?=.*[a-z])$/;
    const upperValidator = /^(?=.*[A-Z])$/;
    const digitValidator = /^(?=.*\d)$/;
    const specialValidator = /^(?=.*[@$!%*?&])$/;
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (a) => getUserData(a.access_token),
  });

  const getUserData = (access_token) => {
    axios
      .get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(function (response) {
        // handle success
        navigate("/dashboard", {
          state: { creds: JSON.stringify(response.data) },
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    // design taken/inspired from https://www.freepik.com/free-vector/log-landing-page-with-gradient-geometric-shapes_5414245.htm#query=login%20page%20design&position=1&from_view=keyword&track=ais_user&uuid=67c280ea-a6f1-4aad-a5c6-51f9bf4d7aec
    <div className="bg-purple-700 w-full h-screen flex justify-center items-center">
      <div
        id="card"
        className="flex items-center justify-center shadow-2xl bg-white"
      >
        <div className="w-6/12 p-11">
          <p className="text-5xl text-purple-500">
            {" "}
            Hello,<br></br>
          </p>
          <p className="text-purple-700 text-4xl font-extrabold"> welcome!</p>
          {index == 0 ? (
            <>
              <div id="inputs" className="flex flex-col gap-4 my-5">
                <TextField
                  className="w-full"
                  id="id-inic"
                  label="E-Mail"
                  variant="outlined"
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
                <button className="text-white px-12 py-1 bg-purple-500 rounded-sm">
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
                  />
                  {/* <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  /> */}
                </div>
              </div>
            </>
          ) : (
            <>
              <div id="inputs" className="flex flex-col gap-4 my-5">
                <TextField
                  className="w-full"
                  id="id-inic"
                  label="E-Mail"
                  variant="outlined"
                />
                <TextField
                  className="w-full"
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => passwordChange(e.target.value)}
                />
                <TextField
                  className="w-full"
                  id="outlined-repassword-input"
                  label="Reenter Password"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  type="password"
                />
                {passwordDontMatch ? (
                  <div className="text-red-600">Password do not match</div>
                ) : null}
              </div>
              <div id="buttons" className="flex gap-4 justify-end">
                <button className="text-white px-12 py-1 bg-purple-500 rounded-sm">
                  Create
                </button>
              </div>
              <div className="mt-4 pt-2 text-center border-t-2">
                Already have an account? <br></br>{" "}
                <a
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIndex(0)}
                >
                  Sign in
                </a>{" "}
                instead
              </div>
            </>
          )}
        </div>
        <div className="w-6/12 border-l">
          <img src={incitLogo} className="incit p-5" alt="Incit logo" />
        </div>
      </div>
    </div>
  );
}
