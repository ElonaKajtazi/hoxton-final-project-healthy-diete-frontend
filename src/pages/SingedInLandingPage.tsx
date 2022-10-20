import { useEffect, useState } from "react";
import { LeftMenu } from "../components/LeftMenu";
import { NewTweetForm } from "../components/NewTweetForm";
import { RightMenu } from "../components/RightMenu";
import { Tweet } from "../components/Tweet";
import { HomeTweetType, UserType, LikeType } from "../types";

type Props = {
  currentUser: null | UserType;
  signOut: () => void;
  search: UserType[] | null;
  setSearch: React.Dispatch<React.SetStateAction<UserType[] | null>>;
};

export function SignedInLandingPage({
  currentUser,
  signOut,
  search,
  setSearch,
}: Props) {
  const [tweets, setTweets] = useState<HomeTweetType[]>([]);
  const [like, setLike] = useState<LikeType | null>(null);

  useEffect(() => {
    if (localStorage.token) {
      fetch(`http://localhost:4443/tweets-for-user`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((rsp) => rsp.json())
        .then((data) => {
          if (data.errors) {
            alert(data.errors);
          } else {
            console.log(data);
            setTweets(data);
          }
        });
    }
  }, []);
  if (!currentUser) return <h1>Loadibg...</h1>;
  console.log(tweets);
  return (
    <div className="home">
      <LeftMenu signOut={signOut} />

      <>
        <section className="main">
          <section className="main-top">
            <h1 className="main-top__home">Home</h1>
          </section>
          {search ? (
            search.map((s) => (
              <li className="name-search" key={s.id}>
                <div className="searched-users">
                  <img src={s.avatar} alt="avatar" className="user-avatar" />
                  <h6>{s.name}</h6>
                </div>
              </li>
            ))
          ) : (
            <>
              <NewTweetForm
                currentUser={currentUser}
                setTweets={setTweets}
                tweets={tweets}
              />
              {tweets.length === 0 ? (
                <p className="no-tweets">No tweets found</p>
              ) : (
                <ul className="tweets">
                  {tweets.map((tweet) => (
                    <Tweet
                      currentUser={currentUser}
                      tweet={tweet}
                      key={tweet.id}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        </section>
      </>
      <RightMenu search={search} setSearch={setSearch} />
    </div>
  );
}
