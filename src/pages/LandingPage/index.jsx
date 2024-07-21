import { useState, useEffect } from "react";
import incitLogo from "../../assets/incit_logo.png";
import Login from "./component/login";
import Register from "./component/register";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function index() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let tmp = Cookies.get("loginInfo");
    if (tmp) {
      navigate("/dashboard");
    }
  }, []);

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
            <Login setIndex={setIndex} />
          ) : (
            <Register setIndex={setIndex} />
          )}
        </div>
        <div className="w-6/12 border-l">
          <img src={incitLogo} className="incit p-5" alt="Incit logo" />
        </div>
      </div>
    </div>
  );
}
