export function NewTweetForm() {
    return (
      <form className="new-tweet-form">
        <img
          className="user-profile-image"
          src="https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <input type="text" placeholder="What's happening?" />
        <button className="home__tweet-btn">Tweet</button>
      </form>
    );
  }
  