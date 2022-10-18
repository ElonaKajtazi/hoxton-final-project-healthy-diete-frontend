import { useState } from "react";
import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import { DataType } from "../types";
import "../styles/signed-out-page.css";
import { SignUpWithGoogleBtn } from "../components/SignUpWithGoogleBtn";
import { SignUpWithAppleBtn } from "../components/SignUpWithAppleBtn";
import { OrSection } from "../components/OrSection";

type Props = {
  signIn: (data: DataType) => void;
};
export function SignedOutLandingPage({ signIn }: Props) {
  const [page, setPage] = useState(0);
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [googleBtnText, setGoogleBtnText] = useState<String>(
    "Sign up with google"
  );
  const [appleBtnText, setAppleBtnText] =
    useState<String>("Sign up with Apple");

  return (
    <div className="signed-out-page">
      <aside className="picture">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="twitter-svg">
          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
        </svg>
      </aside>
      <aside className="join-twitter">
        <img
          className="twitter-icon"
          src="https://i.pinimg.com/736x/99/ee/24/99ee24b95cf5aa5d814e271247d18860.jpg"
          alt="twitter-icon"
        />
        <div className="titles">
          <h1>Happening now</h1>
          <h2>Join twitter today.</h2>
        </div>

        <div className="buttons">
          <SignUpWithGoogleBtn googleBtnText={googleBtnText} />
          <SignUpWithAppleBtn appleBtnText={appleBtnText} />
          {/* <hr /> */}
          <OrSection />
          <button
            className="sign-up-btn email"
            onClick={() => {
              setSignUpModal(true);
            }}
          >
            Sign up with email
          </button>
          <p>
            By signing up, you agree to the <a href="#">Terms of Service</a> and{" "}
            <a href=""> Privacy Policy</a> Privacy Policy, including{" "}
            <a href="">Cookie Use.</a>
          </p>

          <h3>Already have an account?</h3>
          <button
            className="sign-in-btn"
            onClick={() => {
              setSignInModal(true);
            }}
          >
            Sign in
          </button>
        </div>
        {signInModal ? (
          <SignIn
            signIn={signIn}
            setPage={setPage}
            setSignInModal={setSignInModal}
            setSignUpModal={setSignUpModal}
          />
        ) : null}
        {signUpModal ? (
          <SignUp signIn={signIn} setSignUpModal={setSignUpModal} />
        ) : null}
      </aside>
    </div>
  );
}
