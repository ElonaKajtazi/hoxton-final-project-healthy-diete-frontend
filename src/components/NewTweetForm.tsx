
import { UserType } from "../types";

type Props = {
  currentUser: UserType | null;
};

export function NewTweetForm({ currentUser }: Props) {
  if (!currentUser) return <h1>Loading...</h1>;
  return (
    <form className="new-tweet-form">
      <img className="user-profile-image" src={currentUser.avatar} alt="" />
      <div className="inputs">
        <input
          className="input-text"
          type="text"
          placeholder="What's happening?"
        />
        <input
          className="input-image"
          type="text"
          placeholder="...image here"
        />
      </div>
      <button className="home__tweet-btn">Tweet</button>
    </form>
  );
}
