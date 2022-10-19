import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LeftMenu } from "../components/LeftMenu";
import { NewTweetForm } from "../components/NewTweetForm";
import { HomeTweetType, UserType, LikeType } from "../types";

type Props = {
  currentUser: null | UserType;
  signOut: () => void;
};

export function SignedInLandingPage({ currentUser, signOut }: Props) {
  const [tweets, setTweets] = useState<HomeTweetType[]>([]);
  const [like, setLike] = useState<LikeType | null>(null);
  // const [tweetLikes, setTweetLikes] = useState<LikeType[]>([]);
  // function getTweetLikes(tweetId: number) {
  //   fetch(`http://localhost:4443/likes-for-tweet/${tweetId}`)
  //     .then((rsp) => rsp.json())
  //     .then((data) => setTweetLikes(data));
  //     console.log
  // }
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
      <section className="main">
        <section className="main-top">
          <h1 className="main-top__home">Home</h1>
        </section>

        <NewTweetForm currentUser={currentUser} />
        {/* <h1>hello {currentUser.name}</h1> */}

        <ul className="tweets">
          <>
            {tweets.map((tweet) => (
              <li className="single-tweet" key={tweet.id}>
                <div className="user-info">
                  <img
                    className="user-avatar"
                    src={tweet.author.avatar}
                    alt="avatar"
                  />
                  <div className="some-div">
                    <h3 className="user-name">{tweet.author.name}</h3>
                    <p className="tweet-text">{tweet.text}</p>
                  </div>
                  {/* <p className="time"> {tweet.time}</p> */}
                </div>
                {tweet.image ? (
                  <img className="tweet-image" src={tweet.image} alt="image" />
                ) : null}
                <div className="tweet-reactions">
                  <div className="reaction comment">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="comment-icon icon"
                    >
                      <g>
                        <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                      </g>
                    </svg>

                    <span className="comment-icont">
                      {tweet.comments.length}
                    </span>
                  </div>
                  <div className="reaction like">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="like-icon icon"
                      onClick={() => {
                        // let newLike = {
                        //   userId: currentUser.id,
                        //   tweetId: tweet.id,
                        //   commentId: null,
                        // };
                        fetch(
                          `http://localhost:4443/likes-for-tweet/${currentUser.id}`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              tweetId: tweet.id,
                            }),
                          }
                        )
                          .then((rsp) => rsp.json())
                          .then((data) => {
                            console.log(data);

                            tweet.likes.push(data);
                          });
                      }}
                    >
                      <g>
                        <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                      </g>
                    </svg>

                    <span className="like-icon">{tweet.likes.length}</span>
                  </div>
                </div>
              </li>
            ))}
          </>
        </ul>
        {/* <ul className="tweets">
          {tweets.map((tweet) => (
            <Link to="/detailsPage">
              {" "}
              <li className="single-tweet">
                <h3>
                  {tweet.name} {tweet.userName}
                </h3>
                <p>Wine</p>
                <img
                  className="tweet-image"
                  src={tweet.image}
                  alt={tweet.name}
                />
                <div className="reacting-icons">
                  <span className="reacting-icon-container">
                    <img
                      className="reacting-icon"
                      src="https://cdn-icons.flaticon.com/png/512/3031/premium/3031126.png?token=exp=1660079824~hmac=5d8360ee543866e3131db0341642095e"
                      alt="comments icon"
                    />
                    <span>{tweet.reactions.comment}</span>
                  </span>
                  <span className="reacting-icon-container">
                    <img
                      className="reacting-icon"
                      src="https://cdn-icons.flaticon.com/png/512/5436/premium/5436565.png?token=exp=1660079771~hmac=66fca1bfd8b770da314a69fbca5f4ade"
                      alt="retweet icon"
                    />
                    <span>{tweet.reactions.retweet}</span>
                  </span>
                  <span className="reacting-icon-container">
                    <img
                      className="reacting-icon"
                      src="https://cdn-icons.flaticon.com/png/512/2961/premium/2961957.png?token=exp=1660079958~hmac=f144df53cd8c2ddb0ecc467002ba2b96"
                      alt="like icon"
                    />
                    <span>{tweet.reactions.like}</span>
                  </span>
                  <span className="reacting-icon-container">
                    <img
                      className="reacting-icon"
                      src="https://cdn-icons-png.flaticon.com/512/3580/3580382.png"
                      alt="share icon"
                    />
                    <span>{tweet.reactions.share}</span>
                  </span>
                </div>
              </li>
            </Link>
          ))}
        </ul> */}
        {/* <button
          onClick={() => {
            signOut();
          }}
        >
          SIGN OUT
        </button> */}
      </section>
      <section className="right-menu">right</section>
    </div>
  );
}
