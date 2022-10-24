import { UserType } from "../types";
import { NewTweetForm } from "./NewTweetForm";
type Props = {
  currentUser: UserType | null;
  setNewTweetModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export function NewTweetModal({ setNewTweetModal, currentUser }: Props) {
  return (
    <div className="sign-in-modal__wrapper ">
      <div className="sign-in-modal__container">
        <button
          className="sign-in-modal__close-button"
          onClick={() => {
            setNewTweetModal(false);
          }}
        >
          X
        </button>
        <NewTweetForm
          currentUser={currentUser}
   
        />
      </div>
    </div>
  );
}
