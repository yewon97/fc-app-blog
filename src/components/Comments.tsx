import { useContext, useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseApp";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { PostProps } from "@/components/PostList";

const COMMENTS = [
  {
    id: 1,
    email: "test@gmail.com",
    content: "This is a comment",
    createdAt: "2024-02-20",
  },
  {
    id: 2,
    email: "user1@example.com",
    content: "좋은 글이네요. 감사합니다!",
    createdAt: "2024-02-21",
  },
  {
    id: 3,
    email: "user2@example.com",
    content: "이 주제에 대해 더 자세히 알고 싶어요.",
    createdAt: "2024-02-22",
  },
  {
    id: 4,
    email: "user3@example.com",
    content: "정말 유익한 정보였습니다.",
    createdAt: "2024-02-23",
  },
  {
    id: 5,
    email: "user4@example.com",
    content: "다음 글도 기대하고 있겠습니다!",
    createdAt: "2024-02-24",
  },
];

interface CommentsProps {
  post: PostProps;
}

export default function Comments({ post }: CommentsProps) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!post || !post.id) return;
      const postRef = doc(db, "posts", post.id);

      if (user?.uid) {
        const commentObj = {
          content: comment,
          email: user?.email,
          createdAt: new Date().toLocaleDateString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };

        await updateDoc(postRef, {
          comments: arrayUnion(commentObj),
          updateDated: new Date().toLocaleDateString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        });
      }
      toast.success("댓글 작성 성공");
      setComment("");
    } catch (error) {
      console.error(error);
      toast.error("댓글 작성 실패");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="comments">
      <form className="comments__form" onSubmit={handleSubmit}>
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            placeholder="댓글을 입력하세요"
            required
            value={comment}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="form__block form__block-reverse">
          <button type="submit" className="form__btn-submit">
            댓글 작성
          </button>
        </div>
      </form>
      <div className="comments__list">
        {COMMENTS?.map((comment) => (
          <div key={comment.id} className="comment__box">
            <div className="comment__profile-box">
              <div className="comment__email">{comment.email}</div>
              <div className="comment__date">{comment.createdAt}</div>
              <div className="comment__delete">삭제</div>
            </div>
            <div className="comment__text">{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
