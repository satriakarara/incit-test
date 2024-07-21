import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function register({ setIndex }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [emailError, setEmailError] = useState(false);
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
    setPassword(value);
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
    if (password && repassword) {
      if (password != repassword) {
        setPasswordDontMatch(true);
      } else {
        setPasswordDontMatch(false);
      }
    }
  }, [password, repassword]);
  const createAccount = () => {
    if (email.length == 0) {
      setEmailError(true);
    }
    // check if there's still true on passwordinputerror
    const hasTrue = Object.values(passwordInputError).some(
      (value) => value === true
    );
    if (hasTrue) {
      setPasswordError(true);
    }
    // only execute regisster when password already match and email already
    //  filled and theres no error on passwordinputerror
    if (passwordDontMatch == false && email.length > 0 && !hasTrue) {
      axios
        .post(import.meta.env.VITE_API_URL + "/register", {
          email: email,
          password: password,
          repassword: repassword,
        })
        .then(function (response) {
          alert(response.data);
          setIndex(1);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div id="inputs" className="flex flex-col gap-4 my-5">
        <form></form>
        <TextField
          className="w-full"
          id="id-inic"
          label="E-Mail"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={emailError ? "Cannot be empty" : ""}
          error={emailError}
        />
        <TextField
          className="w-full"
          id="outlined-password-input"
          label="Password"
          type="password"
          value={password}
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
          label="Reenter Password"
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
          type="password"
          helperText={passwordDontMatch ? "Password do not match" : ""}
        />
      </div>
      <div id="buttons" className="flex gap-4 justify-end">
        <button
          onClick={() => createAccount()}
          className="text-white px-12 py-1 bg-purple-500 rounded-sm"
        >
          Create
        </button>
      </div>
      <div className="mt-4 pt-2 text-center border-t-2">
        Already have an account? <br></br>{" "}
        <a className="text-blue-500 cursor-pointer" onClick={() => setIndex(0)}>
          Sign in
        </a>{" "}
        instead
      </div>
    </>
  );
}
