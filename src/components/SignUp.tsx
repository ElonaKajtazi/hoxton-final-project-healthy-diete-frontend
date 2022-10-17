export function SignUp({signIn}) {
  return (
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
      {/* {error ? <p className="error">{error}</p> : null} */}

      <button>Register</button>
    </form>
  );
}
