import { PostProps } from "@/components/PostList";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/firebaseApp";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type PostFormProps = {
  title: string;
  summary: string;
  content: string;
};

export default function PostForm() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState<PostProps | null>(null);

  const getPost = async (id: string) => {
    if (!id) return;

    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPost({ ...docSnap.data(), id: docSnap.id } as PostProps);
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  const [postForm, setPostForm] = useState<PostFormProps>({
    title: "",
    summary: "",
    content: "",
  });

  useEffect(() => {
    if (!post) return;

    setPostForm({
      title: post?.title,
      summary: post?.summary,
      content: post?.content,
    });
  }, [post]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setPostForm({ ...postForm, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        // 게시글 수정
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          ...postForm,
          updatedAt: new Date()?.toLocaleDateString(),
        });
        toast.success("게시글이 성공적으로 수정되었습니다.");
        navigate(`/posts/${post?.id}`);
      } else {
        // 게시글 작성
        await addDoc(collection(db, "posts"), {
          ...postForm,
          createdAt: new Date()?.toLocaleDateString(),
          email: user?.email,
          uid: user?.uid,
        });
        toast.success("게시글이 성공적으로 작성되었습니다.");
        navigate("/");
      }
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
          value={postForm?.title}
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
          value={postForm?.summary}
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
          value={postForm?.content}
        />
      </div>
      <div className="form__block">
        <button type="submit" className="form__btn--submit">
          {post ? "수정" : "작성"}
        </button>
      </div>
    </form>
  );
}
