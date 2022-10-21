import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LeftMenu } from "../components/LeftMenu";
import { NewTweetForm } from "../components/NewTweetForm";
import { RightMenu } from "../components/RightMenu";
import { Tweet } from "../components/Tweet";
import { HomeTweetType, UserType, LikeType, NotificationType } from "../types";

type Props = {
  currentUser: null | UserType;
  signOut: () => void;
  search: UserType[] | null;
  setSearch: React.Dispatch<React.SetStateAction<UserType[] | null>>;
  setSeeNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  seeNotifications: boolean;
};

export function SignedInLandingPage({
  currentUser,
  signOut,
  search,
  setSearch,
  setSeeNotifications,
  seeNotifications,
}: Props) {
  const [tweets, setTweets] = useState<HomeTweetType[]>([]);
  // const [like, setLike] = useState<LikeType | null>(null);
  const [notifications, setNotificatios] = useState<NotificationType[]>([]);

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
      fetch(`http://localhost:4443/notifications`, {
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
            setNotificatios(data);
          }
        });
    }
  }, []);
  if (!currentUser) return <h1>Loadibg...</h1>;
  console.log(tweets);
  return (
    <div className="home">
      <LeftMenu
        signOut={signOut}
        setSeeNotifications={setSeeNotifications}
        setSearch={setSearch}
      />

      <>
        <section className="main">
          <section className="main-top">
            {/* <Link to={"/home"}> */}
            <h1
              className="main-top__home"
              onClick={() => {
                setSearch(null);
              }}
            >
              Home
            </h1>
            {/* </Link> */}
          </section>
          {seeNotifications ? (
            notifications.map((not) => (
              <li className="notification" key={not.id}>
                <h5 className="notification-text">{not.text}</h5>
                <p className="notification-time">{not.time}</p>
              </li>
            ))
          ) : search ? (
            search.map((s) => (
              <Link to={`/user/${s.id}`}>
                <li className="name-search" key={s.id}>
                  <div className="searched-users">
                    <img src={s.avatar} alt="avatar" className="user-avatar" />
                    <h6>{s.name}</h6>
                  </div>
                </li>
              </Link>
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
