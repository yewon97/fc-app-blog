import { AuthContext } from "@/context/AuthContext";
import { db } from "@/firebaseApp";
import { addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type PostFormProps = {
  title: string;
  summary: string;
  content: string;
};

export default function PostForm() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [postForm, setPostForm] = useState<PostFormProps>({
    title: "",
    summary: "",
    content: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPostForm({ ...postForm, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        ...postForm,
        createAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      });
      toast.success("게시글이 성공적으로 작성되었습니다.");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          placeholder="제목을 입력해주세요."
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          name="summary"
          id="summary"
          required
          placeholder="요약을 입력해주세요."
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          name="content"
          id="content"
          required
          placeholder="내용을 입력해주세요."
          onChange={onChange}
        />
      </div>
      <div className="form__block">
        <button type="submit" className="form__btn--submit">
          제출
        </button>
      </div>
    </form>
  );
}
