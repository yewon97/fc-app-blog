import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <div className="profile__box">
        <div className="flex__box-lg">
          <div className="profile__image"></div>
          <div>
            <div className="profile__email">test@test.com</div>
            <div className="profile__name">tester</div>
          </div>
        </div>
        <Link to="/" className="profile__logout">
          Logout
        </Link>
      </div>
      <hr className="profile__line" />
    </>
  );
}
