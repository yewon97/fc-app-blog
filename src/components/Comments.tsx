import { useState } from "react";

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

export default function Comments() {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(comment);
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
