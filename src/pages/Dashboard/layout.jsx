import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import incitLogo from "../../assets/incit_logo.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function layout() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    let tmp = Cookies.get("loginInfo");
    if (!tmp) {
      navigate("/");
    } else {
      tmp = JSON.parse(tmp);
      setEmail(tmp.email);
      setIsActive(tmp.active);
    }
  }, []);

  const logout = () => {
    axios
      .post(import.meta.env.VITE_API_URL + "/logout", {
        email: email,
      })
      .then(function (response) {
        Cookies.remove("loginInfo");
        navigate("/");
      })
      .catch(function (error) {
        if (error.response?.status == 401) {
          alert(error.response?.data);
        }
      });
  };

  return (
    <div className="bg-blue-100 w-full h-screen flex">
      <div id="sidebar" className="w-2/12 bg-white border-r-2 p-5">
        <img src={incitLogo} className="incit mb-9" alt="Incit logo" />

        <div className="flex flex-col gap-3">
          {isActive == 1 ? (
            <>
              <div
                onClick={() => navigate("/userProfile")}
                className="font-medium cursor-pointer"
              >
                User Profile
              </div>
              <div
                onClick={() => navigate("/resetPassword")}
                className="font-medium cursor-pointer"
              >
                Reset Password
              </div>
              <div
                onClick={() => navigate("/simpleDashboard")}
                className="font-medium cursor-pointer"
              >
                User Dashboard
              </div>
            </>
          ) : (
            <></>
          )}
          <div
            onClick={() => logout()}
            className="font-bold mt-5 cursor-pointer"
          >
            Logout
          </div>
        </div>
      </div>
      <div id="main-content" className="w-10/12 p-2">
        <div className="w-full bg-white rounded-md p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
