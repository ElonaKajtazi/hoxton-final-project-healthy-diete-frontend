import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LeftMenu } from "../components/LeftMenu";
import { NewTweetModal } from "../components/NewTweetModal";
import { RightMenu } from "../components/RightMenu";
import { CommentType, HomeTweetType, UserType } from "../types";
type Props = {
  signOut: () => void;
  search: UserType[] | null;
  setSearch: React.Dispatch<React.SetStateAction<UserType[] | null>>;
  currentUser: UserType | null;
  setSeeNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  setNewTweetModal: React.Dispatch<React.SetStateAction<boolean>>;
  newTweetModal: boolean;
};

export function SingleTweetPage({
  signOut,
  search,
  setSearch,
  currentUser,
  setSeeNotifications,
  setNewTweetModal,
  newTweetModal,
}: Props) {
  const params = useParams();
  const [singleTweet, setSingeTweet] = useState<null | HomeTweetType>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  useEffect(() => {
    setInterval(() => {
      fetch(`http://localhost:4443/tweets/${params.id}`)
        .then((rsp) => rsp.json())
        .then((data) => {
          if (data.errors) {
            alert(data.errors);
          } else {
            setSingeTweet(data);
          }
        });
      fetch(`http://localhost:4443/comments-per-tweet/${params.id}`)
        .then((rsp) => rsp.json())
        .then((data) => {
          if (data.errors) {
            alert(data.errors);
          } else {
            setComments(data);
          }
        });
    }, 1000);
  }, []);
  return (
    <div className="home">
      <LeftMenu
        setNewTweetModal={setNewTweetModal}
        signOut={signOut}
        setSeeNotifications={setSeeNotifications}
        setSearch={setSearch}
      />
      <section className="main-top">
        <h1 className="main-top__home">
          <Link to="/home">
            <span className="arrow"> ← </span>
          </Link>
          Tweet
        </h1>
        <section className="tweet-details">
          <Link to={`/user/${singleTweet?.authorId}`} className="link">
            <div className="avatar-name">
              <img
                src={singleTweet?.author.avatar}
                alt=""
                className="tweet-details__avatar"
              />
              <h3 className="tweet-details__name">
                {singleTweet?.author.name}
              </h3>
            </div>
          </Link>
          <div className="text-image">
            <h4 className="tweet-details__text">{singleTweet?.text}</h4>
            {singleTweet?.image ? (
              <img
                className="tweet-details__image"
                src={singleTweet.image}
                alt="image"
              />
            ) : null}
          </div>
          <div className="time">
            <p className="single-tweet__time">{singleTweet?.time}</p>
          </div>
          <div className="tweet-details__reactions">
            <p className="tweet-details__reactions-number">
              {singleTweet?.comments.length} <span>Comments</span>{" "}
            </p>
            <p className="tweet-details__reactions-number">
              {singleTweet?.likes.length} <span>Likes</span>{" "}
            </p>
          </div>
          <div className="tweet-details__reaction-icons">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="comment-icon reaction-icon"
            >
              <g>
                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
              </g>
            </svg>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="like-icon reaction-icon"
              onClick={() => {
                // let newLike = {
                //   userId: currentUser.id,
                //   tweetId: tweet.id,
                //   commentId: null,
                // };
                fetch(
                  `http://localhost:4443/likes-for-tweet/${currentUser?.id}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      tweetId: singleTweet?.id,
                    }),
                  }
                )
                  .then((rsp) => rsp.json())
                  .then((data) => {
                    console.log(data);

                    singleTweet?.likes.push(data);
                  });
              }}
            >
              <g>
                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
              </g>
            </svg>
          </div>
          <form
            className="tweet-details__comment-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (localStorage.token) {
                fetch("http://localhost:4443/comments", {
                  method: "POST",
                  headers: {
                    Authorization: localStorage.token,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    text: e.target.comment.value,
                    tweetId: singleTweet?.id,
                  }),
                })
                  .then((rsp) => rsp.json())
                  .then((data) => {
                    if (data.errors) {
                      alert(data.errors);
                    } else {
                      // setComments([...comments, data]);
                      console.log(data);
                    }
                  });
              }
            }}
          >
            <input
              className="comment-input"
              type="text"
              name="comment"
              placeholder="Tweet your reply"
            />
            <button className="home__tweet-btn">Reply</button>
          </form>
          <div className="tweet__details-comments">
            <ul className="comments-list">
              {comments.map((comment) => (
                <li className="comment" key={comment.id}>
                  <div className="avatar-name">
                    <img
                      src={comment.author.avatar}
                      alt=""
                      className="tweet-details__avatar commenter"
                    />
                    <div className="name-comment">
                      <h3 className="tweet-details__name">
                        {comment.author.name}
                      </h3>
                      <h4 className="tweet-details__text">{comment.text}</h4>
                    </div>
                  </div>
                  <div className="text-image">
                    {comment.image ? (
                      <img
                        className="tweet-details__image"
                        src={comment.image}
                        alt="image"
                      />
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {newTweetModal ? (
            <NewTweetModal
              currentUser={currentUser}
              setNewTweetModal={setNewTweetModal}
            />
          ) : null}
        </section>
      </section>
      <RightMenu search={search} setSearch={setSearch} />
    </div>
  );
}
