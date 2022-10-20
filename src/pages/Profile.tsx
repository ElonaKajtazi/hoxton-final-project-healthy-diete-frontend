import { LeftMenu } from "../components/LeftMenu";
import { RightMenu } from "../components/RightMenu";
import { UserType } from "../types";
type Props = {
  signOut: () => void;
  search: UserType[] | null;
  setSearch: React.Dispatch<React.SetStateAction<UserType[] | null>>;
};
export function Profile({ signOut, search, setSearch }: Props) {
  return (
    <div className="proifle home">
      <LeftMenu signOut={signOut} />
      <div className="main profile">hello</div>
      <RightMenu search={search} setSearch={setSearch} />
    </div>
  );
}
