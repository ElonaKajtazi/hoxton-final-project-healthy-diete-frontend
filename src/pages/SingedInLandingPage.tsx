import { Link } from "react-router-dom";
import { LeftMenu } from "../components/LeftMenu";
import { NewTweetForm } from "../components/NewTweetForm";
import { UserType } from "../types";

type Props = {
  currentUser: null | UserType;
  signOut: () => void;
};
export function SignedInLandingPage({ currentUser, signOut }: Props) {
  if (!currentUser) return <h1>Loadibg...</h1>;
  return (
    <div className="home">
      <section className="header">header</section>
      <LeftMenu />
      <section className="main">
        {" "}
        <h1>{`Hi ${currentUser.name}`}</h1>
        <button
        onClick={() => {
          signOut();
        }}
      >
        SIGN OUT
      </button>
      </section>
      <section className="righ-menu">right</section>
    </div>
  );
}
