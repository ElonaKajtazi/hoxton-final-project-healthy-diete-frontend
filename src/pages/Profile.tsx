import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
export function Profile({
  signOut,
  search,
  setSearch,
  currentUser,
  setCurrentUser,
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
  const [changePic, setChangePic] = useState<boolean>(false);
  useEffect(() => {
    fetch(`http://localhost:4443/users/${currentUser?.id}/followers`)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          setFollowers(data);
        }
      });
    fetch(`http://localhost:4443/users/${currentUser?.id}/following`)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          setFollowing(data);
        }
      });
    fetch(`http://localhost:4443/tweets-per-user/${currentUser?.id}`)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          setUserTweets(data);
        }
      });
    fetch(`http://localhost:4443/users-selected-topics/${currentUser?.id}`)
      .then((rsp) => rsp.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else {
          setSelectedTopics(data);
        }
      });
  }, []);
  if (currentUser === null) return <h1>Loading</h1>;
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
            {currentUser?.name}
          </h1>
        </section>
        <div className="profile-info">
          <div className="stuff">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="profile-avatar"
            />
            <button
              className="camera-btn"
              onClick={() => {
                setChangePic(true);
              }}
            >
              📷
            </button>
            <div className="name-email">
              <h2 className="user-name">{currentUser.name}</h2>
              <p>{currentUser.email}</p>
            </div>
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
              {currentUser.twwetTicket} <span>Tweet tickets</span>
            </p>
            <p>
              {currentUser.commentTicket} <span>Comment tickets</span>
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
              <Tweet
                currentUser={currentUser}
                tweet={tweet}
                key={currentUser.id}
              />
            ))}
          </div>
        ) : null}
        {seeFollowers
          ? followers.map((follower) => (
              <Link
                to={`/user/${follower.id}`}
                className="link"
                key={follower.id}
              >
                <li className="name-search">
                  <div className="searched-users">
                    <img
                      src={follower.avatar}
                      alt="avatar"
                      className="user-avatar"
                    />
                    <h6>{follower.name}</h6>
                  </div>
                </li>
              </Link>
            ))
          : null}

        {seeFollowing
          ? following.map((following) => (
              <li className="name-search" key={following.id}>
                <Link
                  to={`/user/${following.id}`}
                  className="link"
              
                >
                  <div className="searched-users">
                    <img
                      src={following.avatar}
                      alt="avatar"
                      className="user-avatar"
                    />
                    <h6>{following.name}</h6>
                  </div>
                </Link>
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
      {changePic ? (
        <ChangeProfilePictureForm
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setChangePic={setChangePic}
        />
      ) : null}
    </div>
  );
}
