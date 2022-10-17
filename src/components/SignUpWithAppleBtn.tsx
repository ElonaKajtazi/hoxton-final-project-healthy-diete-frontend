type Props = {
  appleBtnText: String
}
export function SignUpWithAppleBtn({ appleBtnText }: Props) {
  return (
    <button className="sign-up-btn apple">
      <img
        className="icon"
        src="https://cdn-icons-png.flaticon.com/512/0/747.png"
        alt=""
      />
      {appleBtnText}
    </button>
  );
}
