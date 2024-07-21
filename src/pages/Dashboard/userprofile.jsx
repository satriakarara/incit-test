import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";

export default function userprofile() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    let tmp = Cookies.get("loginInfo");
    if (tmp) {
      tmp = JSON.parse(tmp);
      setFirstName(tmp.first_name ?? "");
      setLastName(tmp.last_name ?? "");
      setEmail(tmp.email ?? "");
    }
  }, []);

  const updateProfile = () => {
    axios
      .post(import.meta.env.VITE_API_URL + "/updateProfile", {
        email: email,
        firstName: firstName,
        lastName: lastName,
      })
      .then(function (response) {
        alert(response?.data.message);
        Cookies.set("loginInfo", JSON.stringify(response.data.user), {
          expires: 7,
        });
      })
      .catch(function (error) {
        if (error.response?.status == 401) {
          alert(error.response?.data);
        }
      });
  };

  const resetProfile = () => {
    setFirstName("");
    setLastName("");
    axios
      .post(import.meta.env.VITE_API_URL + "/updateProfile", {
        email: email,
        firstName: "",
        lastName: "",
      })
      .then(function (response) {
        alert(response?.data.message);
        Cookies.set("loginInfo", JSON.stringify(response.data.user), {
          expires: 7,
        });
      })
      .catch(function (error) {
        if (error.response?.status == 401) {
          alert(error.response?.data);
        }
      });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="font-medium mb-5">User Profile</div>
      <TextField
        className="w-full"
        id="id-Mail"
        label="E-Mail"
        variant="outlined"
        value={email}
        disabled
      />
      <TextField
        className="w-full"
        id="id-First"
        label="First Name"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        className="w-full"
        id="id-Last"
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <div className="w-4/12 gap-2 flex">
        <button
          onClick={() => updateProfile()}
          className="text-white px-12 py-1 bg-purple-500 rounded-sm"
        >
          Update
        </button>
        <button
          onClick={() => resetProfile()}
          className="text-white px-12 py-1 bg-orange-500 rounded-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
