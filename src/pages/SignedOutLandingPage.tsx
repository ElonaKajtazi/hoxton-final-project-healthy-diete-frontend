import { useState } from "react";
import { LogIn } from "../components/LogIn";
import { SignUp } from "../components/SignUp";
import { DataType } from "../types";

type Props = {
  signIn: (data: DataType) => void;
};
export function SignedOutLandingPage({ signIn }: Props) {
  const [page, setPage] = useState(0);
  return (
    <>
      <h1>Hello</h1>
      {page === 0 ? <LogIn signIn={signIn} setPage={setPage} /> : null}
      {page === 1 ? <SignUp signIn={signIn} /> : null}
    </>
  );
}
