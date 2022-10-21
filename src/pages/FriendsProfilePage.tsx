import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChangeProfilePictureForm } from "../components/ChangeProfilePictureForm";
import { LeftMenu } from "../components/LeftMenu";
import { RightMenu } from "../components/RightMenu";
import { Tweet } from "../components/Tweet";
import { HomeTweetType, SelectedTopicType, UserType } from "../types";
type Props = {
  signOut: () => void;
  search: UserType[] | null;
  setSearch: React.Dispatch<React.SetStateAction<UserType[] | null>>;
  currentUser: UserType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  setSeeNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  followers: UserType[];
  setFollowers: React.Dispatch<React.SetStateAction<UserType[]>>;
  following: UserType[];
  setFollowing: React.Dispatch<React.SetStateAction<UserType[]>>;
  userTweets: HomeTweetType[];
  setUserTweets: React.Dispatch<React.SetStateAction<HomeTweetType[]>>;
  selectedTopics: SelectedTopicType[];
  setSelectedTopics: React.Dispatch<React.SetStateAction<SelectedTopicType[]>>;
  seeFollowers: boolean;
  setSeeFollowers: React.Dispatch<React.SetStateAction<boolean>>;
  seeFollowing: boolean;
  setSeeFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  seeTweets: boolean;
  setSeeTweets: React.Dispatch<React.SetStateAction<boolean>>;
  seeSelectedTopics: boolean;
  setSeeSelectedTopics: React.Dispatch<React.SetStateAction<boolean>>;
};
export function FriendsProfilePage({
  signOut,
  search,
  setSearch,
  setSeeNotifications,
  followers,
  setFollowers,
  following,
  setFollowing,
  userTweets,
  setUserTweets,
  selectedTopics,
  setSelectedTopics,
  seeFollowers,
  setSeeFollowers,
  seeFollowing,
  setSeeFollowing,
  seeTweets,
  setSeeTweets,
  seeSelectedTopics,
  setSeeSelectedTopics,
}: Props) {
  const params = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    fetch(`http://localhost:4443/users/${params.id}`)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          setUser(data);
        }
      });
    fetch(`http://localhost:4443/users/${params.id}/followers`)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          setFollowers(data);
        }
      });
    fetch(`http://localhost:4443/users/${params.id}/following`)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          setFollowing(data);
        }
      });
    fetch(`http://localhost:4443/tweets-per-user/${params.id}`)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          setUserTweets(data);
        }
      });
    fetch(`http://localhost:4443/users-selected-topics/${params.id}`)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          setSelectedTopics(data);
        }
      });
  }, []);
  if (user === null) return <h1>Loading</h1>;
  return (
    <div className="home">
      <LeftMenu
        signOut={signOut}
        setSeeNotifications={setSeeNotifications}
        setSearch={setSearch}
      />
      <div className="main profile">
        <section className="main-top">
          <h1 className="main-top__home">
            <Link to="/home">
              <span className="arrow"> ← </span>
            </Link>
            {user.name}
          </h1>
        </section>
        <div className="profile-info">
          <div className="stuff">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
            {/* <button
              className="camera-btn"
              onClick={() => {
                setChangePic(true);
              }}
            >
              📷
            </button> */}
            <div className="name-email">
              <h2 className="user-name">{user.name}</h2>
              <p>{user.email}</p>
            </div>
            <button onClick={() => {
                if(localStorage.token) {

                    fetch(`http://localhost:4443/follow`, {
                        method: "POST",
                        headers: {
                            Authorization: localStorage.token,
                            "Content-Type": "application/json"
                        }, 
                        body: JSON.stringify({
                            friend1Id: user.id
                        })
                    })
                    .then(rsp => rsp.json())
                    .then(data => {
                        if(data.errors) {
                            alert(data.errors)
                        } else {
                            console.log(data)
                        }
                    })
                }
            }}>Follow</button>
          </div>
          
          <div className="following-followers">
            <p
              onClick={() => {
                setSeeTweets(false);
                setSeeFollowers(false);
                setSeeSelectedTopics(false);

                setSeeFollowing(true);
              }}
            >
              {following.length} <span>Following</span>
            </p>
            <p
              onClick={() => {
                setSeeTweets(false);
                setSeeFollowing(false);
                setSeeSelectedTopics(false);

                setSeeFollowers(true);
              }}
            >
              {followers.length} <span>Followers</span>
            </p>
            <p>
              {user.twwetTicket} <span>Tweet tickets</span>
            </p>
            <p>
              {user.commentTicket} <span>Comment tickets</span>
            </p>
            <p
              onClick={() => {
                setSeeFollowers(false);
                setSeeFollowing(false);
                setSeeSelectedTopics(false);

                setSeeTweets(true);
              }}
            >
              <span>Tweets</span>{" "}
            </p>
            <p
              onClick={() => {
                setSeeFollowers(false);
                setSeeFollowing(false);
                setSeeTweets(false);
                setSeeSelectedTopics(true);
              }}
            >
              {selectedTopics.length} <span>Topics</span>
            </p>
          </div>
        </div>
        {seeTweets ? (
          <div className="user-tweets">
            {userTweets.map((tweet) => (
              <Tweet currentUser={user} tweet={tweet} key={user.id} />
            ))}
          </div>
        ) : null}
        {seeFollowers
          ? followers.map((follower) => (
              <li className="name-search" key={follower.id}>
                <div className="searched-users">
                  <img
                    src={follower.avatar}
                    alt="avatar"
                    className="user-avatar"
                  />
                  <h6>{follower.name}</h6>
                </div>
              </li>
            ))
          : null}

        {seeFollowing
          ? following.map((following) => (
              <li className="name-search" key={following.id}>
                <div className="searched-users">
                  <img
                    src={following.avatar}
                    alt="avatar"
                    className="user-avatar"
                  />
                  <h6>{following.name}</h6>
                </div>
              </li>
            ))
          : null}
        {seeSelectedTopics
          ? selectedTopics.map((topic) => (
              <li className="name-search" key={topic.id}>
                <div className="searched-users">
                  <h6>{topic.topic.name}</h6>
                </div>
              </li>
            ))
          : null}
      </div>
      <RightMenu search={search} setSearch={setSearch} />
      {/* {changePic ? (
        <ChangeProfilePictureForm
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setChangePic={setChangePic}
        />
      ) : null} */}
    </div>
  );
}
