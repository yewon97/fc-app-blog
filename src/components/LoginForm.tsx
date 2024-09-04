import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { app } from "@/firebaseApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

type FormType = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<FormType>({
    email: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );
      const user = userCredential.user;
      console.log(user);

      toast.success("로그인에 성공했습니다.");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "email":
        const validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!value.match(validRegex)) {
          setError("이메일 형식이 올바르지 않습니다.");
        } else {
          setError("");
        }
        break;

      case "password":
        if (value.length < 8) {
          setError("비밀번호는 8자리 이상으로 입력해주세요");
        } else {
          setError("");
        }
        break;

      default:
        break;
    }
  };

  return (
    <form onSubmit={onSubmit} className="form form--lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          placeholder="이메일을 입력해주세요."
          onChange={onChange}
          value={form.email}
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
          onChange={onChange}
          value={form.password}
        />
      </div>
      <div className="form__block">
        계정이 없으신가요?
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        <button
          type="submit"
          className="form__btn--submit"
          disabled={error?.length > 0}
        >
          로그인
        </button>
      </div>
    </form>
  );
}
