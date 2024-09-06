import { AuthContext } from "@/context/AuthContext";
import { app } from "@/firebaseApp";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const auth = getAuth(app);
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    try {
      signOut(auth);
      toast.success("로그아웃 되었습니다.");
    } catch (error: any) {
      toast.error(error?.code);
    }
  };

  return (
    <>
      <div className="profile__box">
        <div className="flex__box-lg">
          <div className="profile__image"></div>
          <div>
            <div className="profile__email">{user?.email}</div>
            <div className="profile__name">{user?.displayName || "사용자"}</div>
          </div>
        </div>
        <Link to="/" className="profile__logout" onClick={handleLogout}>
          Logout
        </Link>
      </div>
      <hr className="line-gray" />
    </>
  );
}
