import { useEffect, useState } from "react";
import "./App.css";
import { DataType, UserType } from "./types";
let data = {
  user: {
    id: 3,
    email: "daf@email.com",
    password: "$2a$05$Bl2vVkLMQAPCA0vguJshYOb/jrWgp8vn6snwSYQgxtiU/Hm2LZLni",
    twwetTicket: 5,
    commentTicket: 0,
    tweets: [],
  },
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjY1OTQ2MjM5LCJleHAiOjE2NjYwMzI2Mzl9.R3P8oYDioLikjgJMpsIkuZeYX99ilN0zvhTUSYx9DvM",
};
function App() {
  const [currentUser, setCurrentUser] = useState<null | UserType>(null);
  const [error, setError] = useState<null | Array<string>>();
  useEffect(() => {
    if (localStorage.token) {
      fetch("http://localhost:4444/validate", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.errors) {
            setError(data.errors);
          } else {
            signIn(data);
          }
        });
    }
  }, []);
  function signIn(data: DataType) {
    setCurrentUser(data.user);
    localStorage.token = data.token;
  }

  function signOut() {
    setCurrentUser(null);
    localStorage.removeItem("token");
  }
  console.log(currentUser);
  return (
    <div className="App">
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
                setError(data.errors);
                console.log(error);
              } else {
                signIn(data);
              }
            });
        }}
      >
        <h2 className="form-title">Sign up</h2>
        <label>
          <input
            className="text-input"
            type="name"
            name="name"
            required
            placeholder="Name"
          />
        </label>
        <label>
          <input
            className="text-input"
            type="email"
            name="email"
            required
            placeholder="Email"
          />
        </label>
        <label>
          <input
            className="text-input"
            type="password"
            name="password"
            required
            placeholder="Password"
          />
        </label>
        {error ? <p className="error">{error}</p> : null}

        <button>
          Register
        </button>
      </form>
    </div>
  );
}

export default App;
