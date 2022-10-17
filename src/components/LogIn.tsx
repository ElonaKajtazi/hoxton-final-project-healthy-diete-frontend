import { DataType } from "../types";
import "../styles/sign-in.css";
import { SignUpWithAppleBtn } from "./SignUpWithAppleBtn";
import { SignUpWithGoogleBtn } from "./SignUpWithGoogleBtn";
import { OrSection } from "./OrSection";
import { useState } from "react";

type Props = {
  signIn: (data: DataType) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export function LogIn({ signIn, setPage }: Props) {
  const [appleText, setAppleTxt] = useState<String>("Sign in with Apple");
  const [googleText, setGoogleTxt] = useState<String>("Sign in with Google");
  // const [input, setInput] = useState<boolean>(false);

  return (
    <div className="sign-in-modal__wrapper ">
      <div className="sign-in-modal__container">
        <button className="sign-in-modal__close-button">X</button>
        <img
          className="twitter-icon modal "
          src="https://i.pinimg.com/736x/99/ee/24/99ee24b95cf5aa5d814e271247d18860.jpg"
          alt=""
        />

        {/* <div className="buttons modal-buttons"> */}
        <h2 className="title">Sign in to Twitter</h2>
        <>
          <SignUpWithGoogleBtn googleBtnText={googleText} />
          <SignUpWithAppleBtn appleBtnText={appleText} />
          <OrSection />
        </>

        {/* </div> */}
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            fetch("http://localhost:4443/sign-in", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value,
              }),
            })
              .then((rsp) => rsp.json())
              .then((data) => {
                if (data.errors) {
                  alert(data.errors);
                } else {
                  signIn(data);
                }
              });
          }}
        >
          <input
            className="text-input"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
              <input
            className="text-input"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          {/* <button className="next-btn">Next</button> */}
          <button className="forgot-password-btn">Forgot password?</button>
          <p>
            Don't have an account? <a href="#">Sign up</a>
          </p>

      
          {/* <button>Login</button> */}
          {/* {error ? <p className="error">{error}</p> : null} */}

          {/* <div>
            <button
              color="secondary"
              onClick={() => {
                setPage(1);
              }}
            >
              Create Account
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}
