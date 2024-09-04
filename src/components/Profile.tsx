import { app } from "@/firebaseApp";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const auth = getAuth(app);
  console.log("auth: ", auth.currentUser);

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
            <div className="profile__email">{auth.currentUser?.email}</div>
            <div className="profile__name">
              {auth.currentUser?.displayName || "사용자"}
            </div>
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
