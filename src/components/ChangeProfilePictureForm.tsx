export function ChangeProfilePictureForm({currentUser, setCurrentUser,setChangePic }) {
  return (
    <div className="sign-in-modal__wrapper ">
      <div className="sign-in-modal__container">
        <form onSubmit={(e) => {
            e.preventDefault()
            fetch(`http://localhost:4443/users/${currentUser.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    avatar: e.target.avatar.value
                })
            })
            .then(rsp => rsp.json())
            .then(data => setCurrentUser(data))

            setChangePic(false)

        }}>
            <h2 className="title">Change profile picture</h2>
            <input type="text" name="avatar" className="text-input" placeholder="image url"/>
            <button className="sign-in-btn">Change</button>
        </form>
      </div>
    </div>
  );
}
