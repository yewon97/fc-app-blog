import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "@/context/ThemeContext";
import { BsSun, BsMoonFill } from "react-icons/bs";

export default function Footer() {
  const { theme, toggleMode } = useContext(ThemeContext);

  return (
    <footer>
      <Link to="/posts/new">글쓰기</Link>
      <Link to="/posts">게시글</Link>
      <Link to="/profile"> 프로필</Link>
      <>
        {theme === "light" ? (
          <BsSun
            onClick={() => toggleMode(theme)}
            className="footer__theme-btn"
          />
        ) : (
          <BsMoonFill
            onClick={() => toggleMode(theme)}
            className="footer__theme-btn"
          />
        )}
      </>
    </footer>
  );
}
