import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { FriendsProfilePage } from "./pages/FriendsProfilePage";
import { PageNotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import { SignedOutLandingPage } from "./pages/SignedOutLandingPage";
import { SignedInLandingPage } from "./pages/SingedInLandingPage";
import { SingleTweetPage } from "./pages/SingleTweetPage";
import { DataType, HomeTweetType, SelectedTopicType, UserType } from "./types";

function App() {
  const [currentUser, setCurrentUser] = useState<null | UserType>(null);
  // const [error, setError] = useState<null | Array<string>>();
  const [search, setSearch] = useState<UserType[] | null>(null);
  const [seeNotificatins, setSeeNotifications] = useState<boolean>(false);
  const [followers, setFollowers] = useState<UserType[]>([]);
  const [following, setFollowing] = useState<UserType[]>([]);
  const [userTweets, setUserTweets] = useState<HomeTweetType[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<SelectedTopicType[]>([]);
  const [seeFollowers, setSeeFollowers] = useState<boolean>(false);
  const [seeFollowing, setSeeFollowing] = useState<boolean>(false);
  const [seeTweets, setSeeTweets] = useState<boolean>(true);
  const [seeSelectedTopics, setSeeSelectedTopics] = useState<boolean>(false);
  const [newTweetModal, setNewTweetModal] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.token) {
      fetch("http://localhost:4443/validate", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.errors) {
            alert(data.errors);
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
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={
            currentUser ? (
              <SignedInLandingPage
                newTweetModal={newTweetModal}
                setNewTweetModal={setNewTweetModal}
                seeNotifications={seeNotificatins}
                setSeeNotifications={setSeeNotifications}
                currentUser={currentUser}
                signOut={signOut}
                search={search}
                setSearch={setSearch}
              />
            ) : (
              <SignedOutLandingPage signIn={signIn} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            currentUser ? (
              <Profile
                newTweetModal={newTweetModal}
                setNewTweetModal={setNewTweetModal}
                seeSelectedTopics={seeSelectedTopics}
                setSeeSelectedTopics={setSeeSelectedTopics}
                seeTweets={seeTweets}
                setSeeTweets={setSeeTweets}
                seeFollowing={seeFollowing}
                setSeeFollowing={setSeeFollowing}
                seeFollowers={seeFollowers}
                setSeeFollowers={setSeeFollowers}
                selectedTopics={selectedTopics}
                setSelectedTopics={setSelectedTopics}
                setUserTweets={setUserTweets}
                userTweets={userTweets}
                followers={followers}
                setFollowers={setFollowers}
                following={following}
                setFollowing={setFollowing}
                setSeeNotifications={setSeeNotifications}
                setCurrentUser={setCurrentUser}
                search={search}
                setSearch={setSearch}
                signOut={signOut}
                currentUser={currentUser}
              />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/user/:id"
          element={
            <FriendsProfilePage
              seeSelectedTopics={seeSelectedTopics}
              setSeeSelectedTopics={setSeeSelectedTopics}
              seeTweets={seeTweets}
              setSeeTweets={setSeeTweets}
              seeFollowing={seeFollowing}
              setSeeFollowing={setSeeFollowing}
              seeFollowers={seeFollowers}
              setSeeFollowers={setSeeFollowers}
              selectedTopics={selectedTopics}
              setSelectedTopics={setSelectedTopics}
              setUserTweets={setUserTweets}
              userTweets={userTweets}
              following={following}
              setFollowing={setFollowing}
              followers={followers}
              setFollowers={setFollowers}
              setSeeNotifications={setSeeNotifications}
              setCurrentUser={setCurrentUser}
              search={search}
              setSearch={setSearch}
              signOut={signOut}
              currentUser={currentUser}
            />
          }
        />

        <Route
          path="/tweet/:id"
          element={
            <SingleTweetPage
              newTweetModal={newTweetModal}
              setNewTweetModal={setNewTweetModal}
              setSeeNotifications={setSeeNotifications}
              currentUser={currentUser}
              signOut={signOut}
              search={search}
              setSearch={setSearch}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
