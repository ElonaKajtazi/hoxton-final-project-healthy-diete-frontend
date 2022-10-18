import { useState } from "react";
import { DataType } from "../types";

type Props = {
  signIn: (data: DataType) => void;
  setSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export function SignUp({ signIn, setSignUpModal }: Props) {
  const [signUperror, setSignUpError] = useState<null | string>();
  return (
    <div className="sign-in-modal__wrapper ">
      <div className="sign-in-modal__container">
        <button
          className="sign-in-modal__close-button"
          onClick={() => {
            setSignUpModal(false);
          }}
        >
          X
        </button>
        <img
          className="twitter-icon modal "
          src="https://i.pinimg.com/736x/99/ee/24/99ee24b95cf5aa5d814e271247d18860.jpg"
          alt=""
        />
        <h2 className="title">Create your account</h2>

        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            fetch("http://localhost:4443/sign-up", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value,
              }),
            })
              .then((resp) => resp.json())
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
            type="name"
            name="name"
            required
            placeholder="Name"
          />

          <input
            className="text-input"
            type="email"
            name="email"
            required
            placeholder="Email"
          />

          <input
            className="text-input"
            type="password"
            name="password"
            required
            placeholder="Password"
          />

          {/* {error ? <p className="error">{error}</p> : null} */}
          <button className="sign-up-btn email">Sign up</button>
        </form>
        {/* {signUperror ? alert(signUperror) : null} */}
      </div>
    </div>
  );
}
