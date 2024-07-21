import axios from "axios";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";

export default function userprofile() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState({
    lower: true,
    upper: true,
    digit: true,
    special: true,
    length: true,
  });
  const [passwordDontMatch, setPasswordDontMatch] = useState(false);

  const passwordChange = (value) => {
    setNewPassword(value);
    const lowerValidator = /(?=.*[a-z])/;
    const upperValidator = /(?=.*[A-Z])/;
    const digitValidator = /(?=.*\d)/;
    const specialValidator = /(?=.*[@$!%*?&])/;
    setPasswordInputError({
      lower: !lowerValidator.test(value),
      upper: !upperValidator.test(value),
      digit: !digitValidator.test(value),
      special: !specialValidator.test(value),
      length: value.length < 8,
    });
  };

  useEffect(() => {
    if (newPassword && confirmPassword) {
      if (newPassword != confirmPassword) {
        setPasswordDontMatch(true);
      } else {
        setPasswordDontMatch(false);
      }
    }
  }, [newPassword, confirmPassword]);

  const updatePassword = () => {
    // check if there's still true on passwordinputerror
    const hasTrue = Object.values(passwordInputError).some(
      (value) => value === true
    );
    if (hasTrue) {
      setPasswordError(true);
    }

    if (!hasTrue && passwordDontMatch == false) {
      let tmp = Cookies.get("loginInfo");
      tmp = JSON.parse(tmp);

      axios
        .post(import.meta.env.VITE_API_URL + "/updatePassword", {
          password: password,
          newPassword: newPassword,
          email: tmp.email,
        })
        .then(function (response) {
          alert("Update Success");
        })
        .catch(function (error) {
          if (error.response?.status == 401) {
            alert(error.response?.data);
          }
        });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="font-medium mb-5">Reset Password</div>
      <TextField
        className="w-full"
        id="outlined-password-input"
        label="Old Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        className="w-full"
        id="outlined-newpassword-input"
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => passwordChange(e.target.value)}
        error={passwordError}
      />
      {passwordError && (
        <div className="text-xs ml-3 text-red-600">
          {passwordInputError.lower && (
            <>
              Contains at least one lowercase letter<br></br>
            </>
          )}
          {passwordInputError.upper && (
            <>
              Contains at least one uppercase letter.<br></br>{" "}
            </>
          )}
          {passwordInputError.digit && (
            <>
              Contains at least one digit.<br></br>{" "}
            </>
          )}
          {passwordInputError.special && (
            <>
              Contains at least one special character.<br></br>{" "}
            </>
          )}
          {passwordInputError.length && (
            <>
              Contains at least 8 characters.<br></br>{" "}
            </>
          )}
        </div>
      )}
      <TextField
        className="w-full"
        id="outlined-repassword-input"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        helperText={passwordDontMatch ? "Password do not match" : ""}
      />
      <div className="w-4/12 gap-2 flex">
        <button
          onClick={() => updatePassword()}
          className="text-white px-12 py-1 bg-purple-500 rounded-sm"
        >
          Update
        </button>
      </div>
    </div>
  );
}
