type Props = {
    googleBtnText: String
}
export function SignUpWithGoogleBtn({googleBtnText}: Props) {
    
  return (
    <button className="sign-up-btn google">
      <img
        className="icon"
        src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
        alt="google-icon"
      />
      {googleBtnText}
    </button>
  );
}
