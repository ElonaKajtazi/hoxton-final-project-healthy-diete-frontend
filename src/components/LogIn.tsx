import { DataType } from "../types";

type Props ={
    signIn:(data: DataType) => void,
    setPage: React.Dispatch<React.SetStateAction<number>>
}
export function LogIn ({signIn, setPage}: Props) {
    return (
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
        <h2 className="form-title">Login Form</h2>
        <label>
          <input
            className="text-input"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </label>
        <label>
          <input
            className="text-input"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>
        <button>
          Login
        </button>
        {/* {error ? <p className="error">{error}</p> : null} */}

        <div>
          <button
            color="secondary"
    
            onClick={() => {
              setPage(1);
            }}
          >
            Create Account
          </button>
        </div>
      </form>
    )
}