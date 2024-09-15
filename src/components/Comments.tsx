import { useContext, useMemo, useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseApp";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { CommentsInterface, PostProps } from "@/components/PostList";

interface CommentsProps {
  post: PostProps;
  getPost: (id: string) => Promise<void>;
}

export default function Comments({ post, getPost }: CommentsProps) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!post || !post.id) return;
      const postRef = doc(db, "posts", post.id);

      if (user?.uid) {
        const commentObj = {
          uid: user?.uid,
          content: comment,
          email: user.email,
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
        getPost(post.id);
      }
      toast.success("댓글 작성 성공");
      setComment("");
    } catch (error) {
      console.error(error);
      toast.error("댓글 작성 실패");
    }
  };

  const reversedComments = useMemo(
    () => post?.comments?.slice().reverse(),
    [post?.comments],
  );

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleDeleteComment = async (comment: CommentsInterface) => {
    const confirm = window.confirm("해당 댓글을 정말로 삭제하시겠습니까?");
    try {
      if (!confirm || !post || !post.id) return;

      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, {
        comments: arrayRemove(comment),
      });

      toast.success("댓글 삭제 성공");
      getPost(post.id);
    } catch (error) {
      console.error(error);
      toast.error("댓글 삭제 실패");
    }
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
        {reversedComments?.map((comment) => (
          <div key={comment.createdAt} className="comment__box">
            <div className="comment__profile-box">
              <div className="comment__email">{comment.email}</div>
              <div className="comment__date">{comment.createdAt}</div>
              {comment.uid === user?.uid && (
                <div
                  className="comment__delete"
                  onClick={() => {
                    handleDeleteComment(comment);
                  }}
                >
                  삭제
                </div>
              )}
            </div>
            <div className="comment__text">{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
