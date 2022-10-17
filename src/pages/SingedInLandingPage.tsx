import { UserType } from "../types";

type Props = {
    currentUser:  null | UserType
    signOut: () => void
}
export function SignedInLandingPage({ currentUser, signOut }: Props) {
    if(!currentUser) return <h1>Loadibg...</h1>
  return (
    <>
      <h1>{`Hi ${currentUser.name}`}</h1>
      <button onClick={() => {
        signOut()
      }}>SIGN OUT</button>
    </>
  );
}
