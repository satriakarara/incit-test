import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

export default function index() {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    let tmp = Cookies.get("loginInfo");
    tmp = JSON.parse(tmp);
    setEmail(tmp.email);
    setIsActive(tmp.active);
  }, []);

  const resendVerif = () => {
    axios
      .post(import.meta.env.VITE_API_URL + "/resendEmail", {
        email: email,
      })
      .then(function (response) {
        alert(response.data);
        setIndex(1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div>Welcome!</div>
      <div>
        {isActive == 0 ? (
          <>
            <button
              onClick={() => resendVerif()}
              className="text-white px-12 py-1 bg-purple-500 rounded-sm"
            >
              Resend Email Verification
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
