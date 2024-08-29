import { Link } from "react-router-dom";

export default function SignupForm() {
  return (
    <form action="/post" method="POST" className="form form--lg">
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          placeholder="이메일을 입력해주세요."
        />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="비밀번호를 입력해주세요."
        />
      </div>
      <div className="form__block">
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          required
          placeholder="비밀번호를 입력해주세요."
        />
      </div>
      <div className="form__block">
        계정이 이미 있으신가요?
        <Link to="/login" className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="form__block">
        <button type="submit" className="form__btn--submit">
          로그인
        </button>
      </div>
    </form>
  );
}
