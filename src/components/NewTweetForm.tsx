import { HomeTweetType, UserType } from "../types";

type Props = {
  currentUser: UserType | null;
  setTweets: React.Dispatch<React.SetStateAction<HomeTweetType[]>>;
  tweets: HomeTweetType[];
};

export function NewTweetForm({ currentUser, setTweets, tweets }: Props) {
  if (!currentUser) return <h1>Loading...</h1>;
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <form
      className="new-tweet-form"
      onSubmit={(e) => {
        e.preventDefault();
        fetch(`http://localhost:4443/tweets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.token,
          },
          body: JSON.stringify({
            text: e.target.text.value,
            image: e.target.image.value,
          }),
        })
          .then((rsp) => rsp.json())
          .then((data) => setTweets([...tweets, data]));
          refreshPage()
      }}
    >
      <img className="user-profile-image" src={currentUser.avatar} alt="" />
      <div className="inputs">
        <input
          className="input-text"
          type="text"
          name="text"
          placeholder="What's happening?"
        />
        <input
          className="input-image"
          type="text"
          name="image"
          placeholder="...image here"
        />
      </div>
      <button className="home__tweet-btn">Tweet</button>
    </form>
  );
}
